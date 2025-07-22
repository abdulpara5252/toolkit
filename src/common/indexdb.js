var DB_NAME = "CustomerDB";
var STORE_NAME = "CustomersList";
var cache_glbData = [];

function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = function (e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "ID" });
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

async function saveCustomersToIndexedDB(cusList) {
    const db = await openIndexedDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    for (const cus of cusList) store.put(cus);
    await tx.complete;
    db.close();
}

async function getCustomersFromIndexedDB() {
    const db = await openIndexedDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const all = await new Promise((resolve, reject) => {
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
    db.close();
    return all;
}

function setCusList(cusList) {
    try {
        saveCustomersToIndexedDB(cusList);
    } catch (e) {
        console.warn("storing in IndexedDB failed", e);
    }
}

async function getCusList() {
    try {
        const fallbackList = await getCustomersFromIndexedDB();
        return fallbackList;
    } catch (e) {
        console.warn("Error accessing IndexedDB:", e);
    }
}

function clearIndexedDBCustomers() {

    const request = indexedDB.open(DB_NAME);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const clearRequest = store.clear();

        clearRequest.onsuccess = () => {
            console.log("Old customer data cleared from IndexedDB.");
        };

        clearRequest.onerror = (err) => {
            console.warn("Failed to clear IndexedDB data:", err);
        };
    };

    request.onerror = function (event) {
        console.warn("Failed to open IndexedDB:", event.target.error);
    };
}

async function IsFromIndexedDB() {
    return new Promise((resolve) => {
        const request = indexedDB.open("CustomerDB");

        request.onsuccess = (event) => {
            const db = event.target.result;

            // Check if object store exists
            if (!db.objectStoreNames.contains("CustomersList")) {
                db.close();
                resolve(false);
                return;
            }

            const tx = db.transaction("CustomersList", "readonly");
            const store = tx.objectStore("CustomersList");
            const countReq = store.count();

            countReq.onsuccess = () => {
                db.close();
                resolve(countReq.result > 0); // Data exists?
            };

            countReq.onerror = () => {
                db.close();
                resolve(false);
            };
        };

        request.onerror = () => {
            resolve(false);
        };
    });
}

async function IsFromIndexDb() {
    const result = await IsFromIndexedDB();
    return result;
}

async function AddNewCustomerInIndexDB(result) {
    if (!result || !result.CustomerID) return;

    try {
        const existingList = await getCusList() || [];
        const objData = {
            ID: result.CustomerID.toString(),
            FN: result.FullName,
            D: result.glbDayPhone,
            C: result.glbCell,
            N: result.glbNightPhone,
            E: result.glbEmail
        };

        // Filter out any existing customer with same ID
        const updatedList = existingList.filter(item => item.ID !== result.CustomerID.toString());
        updatedList.push(objData);
        // Save updated list to IndexedDB
        await saveCustomersToIndexedDB(updatedList);

        if (glbParentPage === 'Checkout') {
            setCheckoutCustomerLocalStorageData(); // Assuming this reads from IndexedDB now
        }
        if (glbParentPage === 'CustomerModule') {
            setCustomerModuleCustomerLocalStorageData(); // Assuming this reads from IndexedDB now
        }
    } catch (e) {
        console.warn("Error storing customer to IndexedDB:", e);
    }
}


async function RemoveCustomerFromIndexDB(rCustID) {
    if (!rCustID || rCustID === "0") return;

    const request = indexedDB.open("CustomerDB", 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction("CustomersList", "readwrite");
        const store = transaction.objectStore("CustomersList");

        const deleteRequest = store.delete(rCustID.toString());

        deleteRequest.onsuccess = function () {
            console.log(`Customer with ID ${rCustID} has been deleted from IndexedDB.`);
            if (typeof setCustomerModuleCustomerLocalStorageData === 'function') {
                setCustomerModuleCustomerLocalStorageData();
            }
        };

        deleteRequest.onerror = function (event) {
            console.error("Error deleting customer:", event.target.error);
        };
    };

    request.onerror = function (event) {
        console.error("Error opening IndexedDB:", event.target.error);
    };
}

//Get calling below method from ucAddEditCustomer.ascx if we change add or edit customer popup
function setCustomerModuleCustomerLocalStorageData() {
    try {
        getCusList().then(function (cusList) {
            cache_glbData = cusList;
        })
    } catch (dr) { }
}

//Get calling below method from ucAddEditCustomer.ascx if we change add or edit customer popup
function setCheckoutCustomerLocalStorageData() {
    try {
        _checkout.glbData = (typeof localStorage === 'object' && localStorage["cusList"] !== undefined && localStorage["cusList"].length > 0) ? JSON.parse(localStorage["cusList"] || []) : [];
    } catch (dr) { }
}