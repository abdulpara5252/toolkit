import VgAvatar  from "../VgAvatar/VgAvatar"
import VgBadge  from "../VgBadge/VgBadge"
import VgButton from "../VgButton/VgButton"
import VgCheckbox from "../VgCheckbox/VgCheckbox"
import VgDropdown from "../VgDropdown/VgDropdown"
import VgLinkControl  from "../VgLinkControl/VgLinkControl"
import VgInput from "../VgTextbox/VgTextbox"
import VgToggle from "../VgToggle/VgToggle"

export const mockRowData = [
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": `Nov 21, 2024 - 8:30 AM/n Employee Done/n $<a href="#">TR103100040</a>`,
    "AppDate/n Customer": "Nov 21, 2024 - 10:40 PM/n A Bg",
    "ItemSold/n SoldBy": "Pilates/n Lucky d Singh",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": `Nov 21, 2024 - 4:01 AM/n --/n  $<a href="#">TR103043796</a>`,
    "AppDate/n Customer": "Membership 02/n --",
    "ItemSold/n SoldBy": `Silver membership/n Lucky d Singh $<a href="#">Lucky d Singh</a>`,
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 7:49 AM/n Lucky d Singh/n TR103043796",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": (
      <div>
        <div>
          <VgBadge
            BadgeSize="inline"
            BadgeText="Refund"
            BadgeVariation="alert"
          />
        </div>
        <div style={{ padding: "4px" }}>
          <div>Lucky d Singh</div>
        </div>
      </div>
    ),
    "Qty": 1,
    "Price": "$8.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$8.00",
    "Cash": "$8.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 8:30 AM/n Employee Done/n TR103100040",
    "App.Date": `Nov 21, 2024 - 10:40 PM/ A Bg`,
    "ItemSold/n SoldBy": (
      <div>
        <div>
          <VgBadge
            BadgeSize="inline"
            BadgeText="Refunded"
            BadgeVariation="informational"
          />
        </div>
        <div style={{ padding: "4px" }}>
          <div>Lucky d Singh</div>
        </div>
      </div>
    ),
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 4:01 AM/n --/n TR103097514",
    "AppDate/n Customer": "Membership 02/n --",
    "ItemSold/n SoldBy": "Silver membership/n Lucky d Singh",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 7:49 AM/n Lucky d Singh/n TR103043796",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "\"\"\"@#$%^&*()/n Lucky d Singh",
    "Qty": 1,
    "Price": "$8.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$8.00",
    "Cash": "$8.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "Men's Haircut/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:55 AM/n ashok a",
    "ItemSold/n SoldBy": "2 Strand Twist (Fuller Size)/n dev mail",
    "Qty": 1,
    "Price": "$280.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$280.00",
    "Cash": "$280.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 8:30 AM/n Employee Done/n TR103100040",
    "AppDate/n Customer": "Nov 21, 2024 - 10:40 PM/n A Bg",
    "ItemSold/n SoldBy": "Pilates/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 4:01 AM/n --/n TR103097514",
    "AppDate/n Customer": "Membership 02/n --",
    "ItemSold/n SoldBy": "Silver membership/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 7:49 AM/n Lucky d Singh/n TR103043796",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "\"\"\"@#$%^&*()/n dev mail",
    "Qty": 1,
    "Price": "$8.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$8.00",
    "Cash": "$8.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "Men's Haircut/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:55 AM/n ashok a",
    "ItemSold/n SoldBy": "2 Strand Twist (Fuller Size)/n dev mail",
    "Qty": 1,
    "Price": "$280.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$280.00",
    "Cash": "$280.00",
    "Check": "$0.00",
    "Receipt": {
      "Button": [
        { "ButtonVariant": "destructive", "style": "vertical", "Label": "Refund", "ButtonIcon": "refund", "IconPlacement": "prefix" },
        { "ButtonVariant": "secondary", "style": "vertical", "Label": "Receipt", "ButtonIcon": "receipt", "IconPlacement": "prefix" },]
    }
  }
]

export const mockRowData1 = [
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": `Nov 21, 2024 - 8:30 AM/n Employee Done/n $<a href="#">TR103100040</a>`,
    "AppDate/n Customer": "Nov 21, 2024 - 10:40 PM/n A Bg",
    "ItemSold/n SoldBy": "Pilates/n Lucky d Singh",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": `Nov 21, 2024 - 4:01 AM/n --/n  $<a href="#">TR103043796</a>`,
    "AppDate/n Customer": "Membership 02/n --",
    "ItemSold/n SoldBy": `Silver membership/n Lucky d Singh $<a href="#">Lucky d Singh</a>`,
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 7:49 AM/n Lucky d Singh/n TR103043796",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "\"\"\"@#$%^&*()/n Lucky d Singh",
    "Qty": 1,
    "Price": "$8.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$8.00",
    "Cash": "$8.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 8:30 AM/n Employee Done/n TR103100040",
    "App.Date": `Nov 21, 2024 - 10:40 PM/ A Bg`,
    "ItemSold/n SoldBy": "Pilates/n Lucky d Singh",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 4:01 AM/n --/n TR103097514",
    "AppDate/n Customer": "Membership 02/n --",
    "ItemSold/n SoldBy": "Silver membership/n Lucky d Singh",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 7:49 AM/n Lucky d Singh/n TR103043796",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "\"\"\"@#$%^&*()/n Lucky d Singh",
    "Qty": 1,
    "Price": "$8.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$8.00",
    "Cash": "$8.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "Men's Haircut/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:55 AM/n ashok a",
    "ItemSold/n SoldBy": "2 Strand Twist (Fuller Size)/n dev mail",
    "Qty": 1,
    "Price": "$280.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$280.00",
    "Cash": "$280.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 8:30 AM/n Employee Done/n TR103100040",
    "AppDate/n Customer": "Nov 21, 2024 - 10:40 PM/n A Bg",
    "ItemSold/n SoldBy": "Pilates/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 21, 2024 - 4:01 AM/n --/n TR103097514",
    "AppDate/n Customer": "Membership 02/n --",
    "ItemSold/n SoldBy": "Silver membership/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 7:49 AM/n Lucky d Singh/n TR103043796",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "\"\"\"@#$%^&*()/n dev mail",
    "Qty": 1,
    "Price": "$8.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$8.00",
    "Cash": "$8.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:30 AM/n ashok a",
    "ItemSold/n SoldBy": "Men's Haircut/n dev mail",
    "Qty": 1,
    "Price": "$0.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$0.00",
    "Cash": "$0.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate/n CheckoutBy/n TransactionID": "Nov 20, 2024 - 6:50 AM/n Lucky d Singh/n TR103043088",
    "AppDate/n Customer": "Nov 20, 2024 - 9:55 AM/n ashok a",
    "ItemSold/n SoldBy": "2 Strand Twist (Fuller Size)/n dev mail",
    "Qty": 1,
    "Price": "$280.00",
    "Tax": "$0.00",
    "Tip": "$0.00",
    "Disc": "$0.00",
    "AmtPaid": "$280.00",
    "Cash": "$280.00",
    "Check": "$0.00",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    }
  }
]
export const data = [
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      // "Button":  [{"ButtonVariant": "primary", "Label": "Refund", "ButtonIcon": "pencil", "IconPlacement": "prefix" }],
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      // "Button":  [{"ButtonVariant": "secondary", "Label": "Refund", "ButtonIcon": "pencil", "IconPlacement": "prefix" }],
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      //  "Button":  [{"ButtonVariant": "destructive",  "Label": "Refund", "ButtonIcon": "pencil", "IconPlacement": "prefix" }],
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      // "Avatar": [
      //   { "AvatarSize":"Small", "NoProfile":"Daniel klein", "ProfileUrl":"https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" },
      // ]
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    }
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 8:30 AM",
    "CheckoutBy": "Employee Done",
    "TransactionID": "TR103100040",
    // "AppDate": "Nov 21, 2024 - 10:40 PM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 21, 2024 - 4:01 AM",
    "CheckoutBy": "--",
    "TransactionID": "TR103097514",
    // "AppDate": "Membership 02",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 7:49 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043796",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "Lucky d Singh",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:30 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    "Business": "US02 Biz - 2",
    "CheckoutDate": "Nov 20, 2024 - 6:50 AM",
    "CheckoutBy": "Lucky d Singh",
    "TransactionID": "TR103043088",
    // "AppDate": "Nov 20, 2024 - 9:55 AM",
    "SoldBy": "dev mail",
    "Component": {
      "Button": [{ "ButtonVariant": "action", "actionbutton": "vertical", "ButtonIcon": "", "IconPlacement": "" }],
      "ActionPopup": ["Edit", "Delete"]
    },
  }
]

export const ParentData = [
  {
    "Name": "Mill",
    "Address": "Room 1057",
    "Child":
      [
        {
          "Name": "Florencia",
          "Address": "Amd",
          "Component": {
            "Name": "TextBox",
            "Address": "TextAres"
          }
        },
        {
          "Name": "Emelita",
          "Address": "Amd",
          "Component": {
            "Name": "TextBox",
            "Address": "TextAres"
          }
        },
        {
          "Name": "Herve",
          "Address": "Amd",
          "Component": {
            "Name": "TextBox",
            "Address": "TextAres"
          }
        },
        {
          "Name": "Stearne",
          "Address": "Amd",
          "Component": {
            "Name": "TextBox",
            "Address": "TextAres"
          }
        }
      ],
    "Component": {
      "Name": "TextBox",
      "Address": "TextAres"
    }
  },
  {
    "Name": "Florencia",
    "Address": "Room 628"
  },
  {
    "Name": "Emelita",
    "Address": "Apt 1419"
  },
  {
    "Name": "Stearne",
    "Address": "Room 973"
  },
  {
    "Name": "Annadiana",
    "Address": "Apt 122"
  },
  {
    "Name": "Derron",
    "Address": "Suite 53"
  },
  {
    "Name": "Herve",
    "Address": "Room 409"
  },
]

export const ColumnData = [
  {
    DataValue: "Business",
    Dataheader: "Business",
    Width: 10,
    Sorting: true,
  },
  {
    DataValue: "CheckoutDate/n CheckoutBy/n TransactionID",
    Dataheader: ["Checkout Date", "Checkout By", "Transaction ID"],
    Width: 20,
    Sorting: true,
  },
  {
    DataValue: "AppDate/n Customer",
    Dataheader: ["App.Date", "Customer"],
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "ItemSold/n SoldBy",
    Dataheader: ["Item Sold", "Sold By"],
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Qty",
    Dataheader: "Qty",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Price",
    Dataheader: "Price",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Tax",
    Dataheader: "Tax",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Tip",
    Dataheader: "Tip",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Cash",
    Dataheader: "Cash",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Check",
    Dataheader: "Check",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Receipt",
    Dataheader: "",
    minWidth: 30,
    Sorting: false,
  },
]

export const ColumnData1 = [
  {
    DataValue: "Business",
    Dataheader: "Business",
    Width: 10,
    Sorting: true,
  },
  {
    DataValue: "CheckoutDate/n CheckoutBy/n TransactionID",
    Dataheader: "Checkout Date/n Checkout By/n Transaction ID",
    Width: 10,
    Sorting: true,
  },
  {
    // DataValue: "AppDate/n Customer",
    Dataheader: "App.Date/n Customer",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "ItemSold/n SoldBy",
    Dataheader: "Item Sold/n Sold By",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Qty",
    Dataheader: "Qty",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Price",
    Dataheader: "Price",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Tax",
    Dataheader: "Tax",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Tip",
    Dataheader: "Tip",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Disc",
    Dataheader: "Disc",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "AmtPaid",
    Dataheader: "Amt Paid",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Cash",
    Dataheader: "Cash",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Check",
    Dataheader: "Check",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Component",
    Dataheader: "",
    minWidth: 30,
    Sorting: false,
  }
]



export const ParentTableColumn = [
  {
    DataValue: "Name",
    Dataheader: "Name",
    Width: 10,
    Sorting: true,
  },
  {
    DataValue: "Address",
    Dataheader: "Address",
    Width: 10,
    Sorting: true,
  },
]

export const FooterData = [
  {
    FooterValue: "",
    Footerheader: "Business",
  },
  {
    FooterValue: "",
    Footerheader: "Checkout Date/n Checkout By/n Transaction ID",
  },
  {
    FooterValue: "",
    Footerheader: "App.Date/n Customer",
  },
  {
    FooterValue: "Total",
    Footerheader: "Item Sold/n Sold By",
  },
  {
    FooterValue: "12",
    Footerheader: "Qty",
  },
  {
    FooterValue: "$50.00",
    Footerheader: "Price",
  },
  {
    FooterValue: "$70.00",
    Footerheader: "Tax",
  },
  {
    FooterValue: "$150.00",
    Footerheader: "Amt Paid",
  },
  {
    FooterValue: "$250.00",
    Footerheader: "Cash",
  },
  {
    FooterValue: "$50.00",
    Footerheader: "Check",
  },
  {
    FooterValue: "",
    Footerheader: "Check",
  },
]

export const ProgressBarTableData = [
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Modified Date": "Nov 23, 2024",
    "Modified By": "Admin 1",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Modified Date": "Nov 23, 2024",
    "Modified By": "Admin 1",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Modified Date": "Nov 23, 2024",
    "Modified By": "Admin 1",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
    "renewalStatus": "Active",
    "Modified Date": "Nov 23, 2024",
    "Modified By": "Admin 1",
  }
]

export const ProgressBarColumnData = [
  {
    DataValue: "Employees",
    Dataheader: "Employees",
    Width: 20,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Access Leval",
    Dataheader: "Access Leval",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Employee Type",
    Dataheader: "Employee Type",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Status",
    Dataheader: "Status",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "renewalStatus",
    Dataheader: "Renewal Status",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Modified Date",
    Dataheader: "Modified Date",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Modified By",
    Dataheader: "Modified By",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Modified By",
    Dataheader: "Modified By",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Modified By",
    Dataheader: "Modified By",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Modified By",
    Dataheader: "Modified By",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Modified By",
    Dataheader: "Modified By",
    Width: 10,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Component",
    Dataheader: "",
    Width: 10,
    sticky: true,
    Sorting: false,
  },

]

export const ProductDataColumn = [
  {
    DataValue: "Product",
    // DataValue:<div className="collapse-all-link"> Collaspe All</div>, 
    Dataheader: "Product ",
    Width: 10,
    Sorting: false,
  },
  // {
  //   DataValue: "ProductName",
  //   Dataheader: "ProductName",
  //   Width: 10,
  //   Sorting: false,
  // },
  {
    DataValue: "Brand",
    Dataheader: "Brand",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "ProuctType",
    Dataheader: "ProuctType",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Barcode_ID",
    Dataheader: "Barcode_ID",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Buisness_Cost",
    Dataheader: "Buisness_Cost",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "Selling_Price",
    Dataheader: "Selling_Price",
    Width: 10,
    Sorting: false,
  },
  {
    DataValue: "In_Stock",
    Dataheader: "In_Stock",
    Width: 10,
    Sorting: false,
  },
]

export const ProductData = [
  {
    Product: <div className="product-table-flex">
      <div className="product-inner-img">
        <img src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" width="40" height="48" />
      </div>
      <div className="product-name">
        <div className="product-heading">Upneeq Eye Drop</div>
      </div>
    </div>,
    Brand: "Upneeq",
    ProuctType: "Skin Care - Serums",
    Barcode_ID: 456665423,
    Buisness_Cost: "$2.50",
    Selling_Price: "$10.00",
    In_Stock: 6
  },
  {
    Product: <div className="product-table-flex">
      <div className="product-inner-img">
        <img src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" width="40" height="48" />
      </div>
      <div className="product-name">
        <div className="product-heading">Hinoki Shampoo</div>
      </div>
    </div>,
    Child: [
      {
        Product: <div className="product-table-flex">
          <div className="product-inner-img">
            <img src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" width="40" height="48" />
          </div>
          <div className="product-name">
            <div className="product-heading">85ml / 2.8 fl oz.</div>
          </div>
        </div>,
        Brand: "",
        ProuctType: "",
        Barcode_ID: 452145264854,
        Buisness_Cost: "$8.00",
        Selling_Price: "$16.00",
        In_Stock: 8
      },
      {
        Product: <div className="product-table-flex">
          <div className="product-inner-img">
            <img src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" width="40" height="48" />
          </div>
          <div className="product-name">
            <div className="product-heading">250ml / 8.5 fl oz.</div>
          </div>
        </div>,
        Brand: "",
        ProuctType: "",
        Barcode_ID: 452145264854,
        Buisness_Cost: "$20.00",
        Selling_Price: "$40.00",
        In_Stock: 8
      },
      {
        Product: <div className="product-table-flex">
          <div className="product-inner-img">
            <img src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" width="40" height="48" />
          </div>
          <div className="product-name">
            <div className="product-heading">500ml / 6.9 fl oz.</div>
          </div>
        </div>,
        Brand: "",
        ProuctType: "",
        Barcode_ID: 452145264854,
        Buisness_Cost: "$27.50",
        Selling_Price: "$55.00",
        In_Stock: 12
      },
    ],
    Brand: "Le Labo",
    ProuctType: "Hair Care - Shampoo",
    Barcode_ID: '',
    Buisness_Cost: "$8.00 - $27.50",
    Selling_Price: "$16.00 -$55.00",
    In_Stock: 28
  },
  {
    Product: <div className="product-table-flex">
      <div className="product-inner-img">
        <img src="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg" width="40" height="48" />
      </div>
      <div className="product-name">
        <div className="product-heading">Upneeq Eye Drop</div>
      </div>
    </div>,
    Brand: "Upneeq",
    ProuctType: "Skin Care - Serums",
    Barcode_ID: 456665423,
    Buisness_Cost: "$2.50",
    Selling_Price: "$10.00",
    In_Stock: 6
  },
];


export const PackegeColumnData = [
  { DataValue: "Action", Dataheader: "Action", Width: 10, sticky: false, Sorting: false },
  { DataValue: "purchaseDate", Dataheader: "Purchase Date", Width: 10, sticky: false, Sorting: false },
  { DataValue: "customer", Dataheader: "Customer", Width: 10, sticky: false, Sorting: false },
  { DataValue: "businessName", Dataheader: "Business Name", Width: 10, sticky: false, Sorting: false },
  { DataValue: "initialAmount", Dataheader: "Initial Amount", Width: 10, sticky: false, Sorting: false },
  { DataValue: "currentBalance", Dataheader: "Current Balance", Width: 10, sticky: false, Sorting: false },
  { DataValue: "visitsRemaining", Dataheader: "# of Visits Remaining", Width: 10, sticky: false, Sorting: false },
  { DataValue: "expirationDate", Dataheader: "Expiration Date", Width: 10, sticky: false, Sorting: false },
  { DataValue: "status", Dataheader: "Status", Width: 80, sticky: false, Sorting: false },
  { DataValue: "cancelReason", Dataheader: "Cancel Reason", sticky: false, Width: 10, Sorting: false },
  { DataValue: "autoRenewal", Dataheader: "Auto Renewal", Width: 10, sticky: false, Sorting: false },
  { DataValue: "renewalStatus", Dataheader: "Renewal Status", Width: 10, sticky: false, Sorting: false },
  { DataValue: "nextPaymentDate", Dataheader: "Next Payment Date", Width: 10, sticky: false, Sorting: false },
  { DataValue: "autoRenewalLimit", Dataheader: "Auto Renewal Limit", Width: 10, sticky: false, Sorting: false },
  { DataValue: "modifiedDate", Dataheader: "Modified Date", Width: 10, sticky: false, Sorting: false },
  { DataValue: "modifiedBy", Dataheader: "Modified By", Width: 10, sticky: false, Sorting: false },
  { DataValue: "Component", Dataheader: "", Width: 10, sticky: false, Sorting: false },
];


export const PackegeRowData = [
  ...Array.from({ length: 20 }, (_, index) => ({
    Action: {
      "DropDown": [{
        "ButtonVariant": "secondary", "style": "vertical", "Label": "Action", "ButtonIcon": "", "IconPlacement": "prefix"
      }],
      "ActionPopup": ["Action", "Edit Package", "Edit Balance", "Pause Auto Renew", "Cancel Package", "Refund Package", "History"]
    },
    purchaseDate: `Nov 25, 2024 - ${4 - Math.floor(index / 6)}:${(3 - index) % 60} AM`,
    customer: `Customer ${index + 1}`,
    businessName: `US02 Salon & Spa ${index % 5 + 1}`,
    initialAmount: `$${Math.floor(Math.random() * 100 + 50).toFixed(2)} (${index})`,
    currentBalance: `$${Math.floor(Math.random() * 100).toFixed(2)}`,
    visitsRemaining: `Classes - ${Math.floor(Math.random() * 10 + 1)} visits | ${Math.floor(Math.random() * 5)}`,
    expirationDate: index % 2 === 0 ? "---" : `Nov ${Math.floor(Math.random() * 30 + 1)}, 2024`,
    status: ["Outstanding", "Active", "Cancelled"][index % 3],
    cancelReason: index % 3 === 2 ? "No. of Visits Completed" : "---",
    autoRenewal: index % 2 === 0 ? "Enabled" : "---",
    renewalStatus: ["Active", "Inactive", "---"][index % 3],
    nextPaymentDate: index % 2 === 0 ? `Dec ${Math.floor(Math.random() * 31 + 1)}, 2024` : "---",
    autoRenewalLimit: index % 2 === 0 ? "Unlimited" : "---",
    modifiedDate: `Nov ${Math.floor(Math.random() * 30 + 1)}, 2024`,
    modifiedBy: `Admin ${index + 1}`,
    // Component : {
    //   "Button": [{
    //     "ButtonVariant": "action", "Label": ""
    //   }],
    //   "ActionPopup": ["Edit", "Delete"]
    // },
  })),
];

export const TableInfoData = [
  {
    Text: "Table Data",
    "Text - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>Table Data 2</div>
      </div>
    ),
    "Text & Link - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>
          <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
        </div>
      </div>
    ),
    "Input Field": (
      <VgInput
        CustomMsg=""
        InputId=""
        InputTitle="Title:"
        Name=""
        OnBlur={() => { }}
        OnChange={(e: any) => {}}
        PlaceHolder="Input Field"
        SetValue=""
        UrlPrefix=""
        Validation="none"
      />
    ),
    "Dropdown": (
      <VgDropdown
        AutoFocus
        CallBackTimeCount={0}
        ClassNamePrefix="vg-select2-dropdown"
        CustomClassNamePrefix="custom-class"
        CustomPlaceholderName="Selected"
        DefaultValue={[]}
        DropdownClosingName=""
        DropdownData={[
          {
            label: "Colours",
            options: [
              {
                label: "Oceans",
                value: "ocean",
              },
              {
                label: "Blue",
                value: "blue",
              },
              {
                label: "Purple",
                value: "purple",
              },
              {
                label: "Red",
                value: "red",
              },
              {
                label: "Orange",
                value: "orange",
              },
              {
                label: "Yellow",
                value: "yellow",
              },
              {
                label: "Green",
                value: "green",
              },
              {
                label: "Forest",
                value: "forest",
              },
              {
                label: "Slate",
                value: "slate",
              },
              {
                label: "Silver",
                value: "silver",
              },
            ],
          },
        ]}
        DropdownId=""
        DropdownName=""
        DropdownWidth={350}
        SearchPlaceholder="Search"
        IsApplyButtonOn
        DropdownClosed={() => { }}
        GroupOptions
        Multi
        OpenFromBody
        Required
        IsSearchable
        ShowCheckBoxInGroup
        ShowCustomMessage="No results found. Please try another search."
        MenuPlacement="auto"
        NativeActionValue={13}
        Placeholder="Select"
        // RequiredMessage="This field is required"
        RightSwipeEvent
        SetCustomPlaceholder
        ShowHideFooter={2}
        ShowSelectAllSelectNone
        TabIndex={0}
        VagaroToolkit={1}
        VirtualDropdownHeight={300}
        onChange={(e: any) => {}}
      />
    ),
    "Ghost Button": (
      <VgButton
        ButtonIcon="plus"
        ButtonVariant="ghost"
        ButtononClick={(e: any) => {}}
        ButtononHover={() => { }}
      >
        Button
      </VgButton>
    ),
    "Grabber and Text": (
      <div className="drag-text">
        <i className="fa-solid fa-bars"></i> Table Data
      </div>
    ),
    Toggle: (
      <VgToggle
        Description="This is an additional description for the switch"
        Name=""
        OnChange={(checked) => {}}
        Title="Toggle Name Here"
        ToggleId="1"
        ToggleVariation="Default"
      />
    ),
    Link: (
      <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
    ),
    "3 Dot Action": (
      (
        <VgButton
          ButtonIcon=""
          ButtonVariant="action"
          ButtononClick={(e: any) => {}}
          ButtononHover={() => { }}
          actionbutton="vertical"
        />
      )
    ),
    "Checkbox": (
      <VgCheckbox
        CheckBoxId="1"
        CheckboxLabel=""
        CheckboxVariation="Checkbox-Simple"
        Name="vg-checkbox"
        OnChange={(checked) => {}}
        OnHover={() => { }}
      />
    ),
    "Badge Inline": (
      <VgBadge
        BadgeSize="inline"
        BadgeText="Info Badge"
        BadgeVariation="defaults"
      />
    )
  },
  {
    Text: "Table Data",
    "Text - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>Table Data 2</div>
      </div>
    ),
    "Text & Link - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>
          <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
        </div>
      </div>
    ),
    "Input Field": (
      <VgInput
        CustomMsg=""
        InputId=""
        InputTitle="Title:"
        Name=""
        OnBlur={() => { }}
        OnChange={(e: any) => {}}
        PlaceHolder="Input Field"
        SetValue=""
        UrlPrefix=""
        Validation="none"
      />
    ),
    "Dropdown": (
      <VgDropdown
        AutoFocus
        CallBackTimeCount={0}
        ClassNamePrefix="vg-select2-dropdown"
        CustomClassNamePrefix="custom-class"
        CustomPlaceholderName="Selected"
        DefaultValue={[]}
        DropdownClosingName=""
        onChange={(e: any) => {}}
        DropdownData={[
          {
            label: "Colours",
            options: [
              {
                label: "Oceans",
                value: "ocean",
              },
              {
                label: "Blue",
                value: "blue",
              },
              {
                label: "Purple",
                value: "purple",
              },
              {
                label: "Red",
                value: "red",
              },
              {
                label: "Orange",
                value: "orange",
              },
              {
                label: "Yellow",
                value: "yellow",
              },
              {
                label: "Green",
                value: "green",
              },
              {
                label: "Forest",
                value: "forest",
              },
              {
                label: "Slate",
                value: "slate",
              },
              {
                label: "Silver",
                value: "silver",
              },
            ],
          },
        ]}
        DropdownId=""
        DropdownName=""
        DropdownWidth={350}
        SearchPlaceholder="Search"
        IsApplyButtonOn
        DropdownClosed={() => { }}
        GroupOptions
        Multi
        OpenFromBody
        Required
        IsSearchable
        ShowCheckBoxInGroup
        ShowCustomMessage="No results found. Please try another search."
        MenuPlacement="auto"
        NativeActionValue={13}
        Placeholder="Select"
        // RequiredMessage="This field is required"
        RightSwipeEvent
        SetCustomPlaceholder
        ShowHideFooter={2}
        ShowSelectAllSelectNone
        TabIndex={0}
        VagaroToolkit={1}
        VirtualDropdownHeight={300}
      />
    ),
    "Ghost Button": (
      <VgButton
        ButtonIcon="plus"
        ButtonVariant="ghost"
        ButtononClick={(e: any) => {}}
        ButtononHover={() => { }}
      >
        Button
      </VgButton>
    ),
    "Grabber and Text": (
      <div className="drag-text">
        <i className="fa-solid fa-bars"></i> Table Data
      </div>
    ),
    Toggle: (
      <VgToggle
        Description="This is an additional description for the switch"
        Name=""
        OnChange={(checked) => {}}
        Title="Toggle Name Here"
        ToggleId=""
        ToggleVariation="Default"
      />
    ),
    Link: (
      <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
    ),
    "3 Dot Action": (
      (
        <VgButton
          ButtonIcon=""
          ButtonVariant="action"
          ButtononClick={() => { }}
          ButtononHover={() => { }}
          actionbutton="vertical"
        />
      )
    ),
    "Checkbox": (
      <VgCheckbox
        CheckBoxId="2"
        CheckboxLabel=""
        CheckboxVariation="Checkbox-Simple"
        Name="vg-checkbox"
        OnChange={(checked) => {}}
        OnHover={() => { }}
      />
    ),
    "Badge Inline": (
      <VgBadge
        BadgeSize="inline"
        BadgeText="Info Badge"
        BadgeVariation="defaults"
      />
    )
  },
  {
    Text: "Table Data",
    "Text - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>Table Data 2</div>
      </div>
    ),
    "Text & Link - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>
          <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
        </div>
      </div>
    ),
    "Input Field": (
      <VgInput
        CustomMsg=""
        InputId=""
        InputTitle="Title:"
        Name=""
        OnBlur={() => { }}
        OnChange={(e) => {}}
        PlaceHolder="Input Field"
        SetValue=""
        UrlPrefix=""
        Validation="none"
      />
    ),
    "Dropdown": (
      <VgDropdown
        AutoFocus
        CallBackTimeCount={0}
        ClassNamePrefix="vg-select2-dropdown"
        CustomClassNamePrefix="custom-class"
        CustomPlaceholderName="Selected"
        DefaultValue={[]}
        DropdownClosingName=""
        DropdownData={[
          {
            label: "Colours",
            options: [
              {
                label: "Oceans",
                value: "ocean",
              },
              {
                label: "Blue",
                value: "blue",
              },
              {
                label: "Purple",
                value: "purple",
              },
              {
                label: "Red",
                value: "red",
              },
              {
                label: "Orange",
                value: "orange",
              },
              {
                label: "Yellow",
                value: "yellow",
              },
              {
                label: "Green",
                value: "green",
              },
              {
                label: "Forest",
                value: "forest",
              },
              {
                label: "Slate",
                value: "slate",
              },
              {
                label: "Silver",
                value: "silver",
              },
            ],
          },
        ]}
        DropdownId=""
        DropdownName=""
        DropdownWidth={350}
        SearchPlaceholder="Search"
        IsApplyButtonOn
        DropdownClosed={() => { }}
        GroupOptions
        Multi
        OpenFromBody
        Required
        IsSearchable
        ShowCheckBoxInGroup
        ShowCustomMessage="No results found. Please try another search."
        MenuPlacement="auto"
        NativeActionValue={13}
        Placeholder="Select"
        // RequiredMessage="This field is required"
        RightSwipeEvent
        SetCustomPlaceholder
        ShowHideFooter={2}
        ShowSelectAllSelectNone
        TabIndex={0}
        VagaroToolkit={1}
        VirtualDropdownHeight={300}
        onChange={(e: any) => {}}
      />
    ),
    "Ghost Button": (
      <VgButton
        ButtonIcon="plus"
        ButtonVariant="ghost"
        ButtononClick={(e: any) => {}}
        ButtononHover={() => { }}
      >
        Button
      </VgButton>
    ),
    "Grabber and Text": (
      <div className="drag-text">
        <i className="fa-solid fa-bars"></i> Table Data
      </div>
    ),
    Toggle: (
      <VgToggle
        Description="This is an additional description for the switch"
        Name=""
        OnChange={(checked) => {}}
        Title="Toggle Name Here"
        ToggleId="3"
        ToggleVariation="Default"
      />
    ),
    Link: (
      <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
    ),
    "3 Dot Action": (
      (
        <VgButton
          ButtonIcon=""
          ButtonVariant="action"
          ButtononClick={() => { }}
          ButtononHover={() => { }}
          actionbutton="vertical"
        />
      )
    ),
    "Checkbox": (
      <VgCheckbox
        CheckBoxId="3"
        CheckboxLabel=""
        CheckboxVariation="Checkbox-Simple"
        Name="vg-checkbox"
        OnChange={(checked) => {}}
        OnHover={() => { }}
      />
    ),
    "Badge Inline": (
      <VgBadge
        BadgeSize="inline"
        BadgeText="Info Badge"
        BadgeVariation="defaults"
      />
    )
  },
  {
    Text: "Table Data",
    "Text - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>Table Data 2</div>
      </div>
    ),
    "Text & Link - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>
          <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
        </div>
      </div>
    ),
    "Input Field": (
      <VgInput
        CustomMsg=""
        InputId=""
        InputTitle="Title:"
        Name=""
        OnBlur={() => { }}
        OnChange={(e) => {}}
        PlaceHolder="Input Field"
        SetValue=""
        UrlPrefix=""
        Validation="none"
      />
    ),
    "Dropdown": (
      <VgDropdown
        AutoFocus
        CallBackTimeCount={0}
        ClassNamePrefix="vg-select2-dropdown"
        CustomClassNamePrefix="custom-class"
        CustomPlaceholderName="Selected"
        DefaultValue={[]}
        DropdownClosingName=""
        DropdownData={[
          {
            label: "Colours",
            options: [
              {
                label: "Oceans",
                value: "ocean",
              },
              {
                label: "Blue",
                value: "blue",
              },
              {
                label: "Purple",
                value: "purple",
              },
              {
                label: "Red",
                value: "red",
              },
              {
                label: "Orange",
                value: "orange",
              },
              {
                label: "Yellow",
                value: "yellow",
              },
              {
                label: "Green",
                value: "green",
              },
              {
                label: "Forest",
                value: "forest",
              },
              {
                label: "Slate",
                value: "slate",
              },
              {
                label: "Silver",
                value: "silver",
              },
            ],
          },
        ]}
        DropdownId=""
        DropdownName=""
        DropdownWidth={350}
        SearchPlaceholder="Search"
        IsApplyButtonOn
        DropdownClosed={() => { }}
        GroupOptions
        Multi
        OpenFromBody
        Required
        IsSearchable
        ShowCheckBoxInGroup
        ShowCustomMessage="No results found. Please try another search."
        MenuPlacement="auto"
        NativeActionValue={13}
        Placeholder="Select"
        // RequiredMessage="This field is required"
        RightSwipeEvent
        SetCustomPlaceholder
        ShowHideFooter={2}
        ShowSelectAllSelectNone
        TabIndex={0}
        VagaroToolkit={1}
        VirtualDropdownHeight={300}
        onChange={(e: any) => {}}
      />
    ),
    "Ghost Button": (
      <VgButton
        ButtonIcon="plus"
        ButtonVariant="ghost"
        ButtononClick={(e: any) => {}}
        ButtononHover={() => { }}
      >
        Button
      </VgButton>
    ),
    "Grabber and Text": (
      <div className="drag-text">
        <i className="fa-solid fa-bars"></i> Table Data
      </div>
    ),
    Toggle: (
      <VgToggle
        Description="This is an additional description for the switch"
        Name=""
        OnChange={(checked) => {}}
        Title="Toggle Name Here"
        ToggleId="4"
        ToggleVariation="Default"
      />
    ),
    Link: (
      <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
    ),
    "3 Dot Action": (
      (
        <VgButton
          ButtonIcon=""
          ButtonVariant="action"
          ButtononClick={() => { }}
          ButtononHover={() => { }}
          actionbutton="vertical"
        />
      )
    ),
    "Checkbox": (
      <VgCheckbox
        CheckBoxId="4"
        CheckboxLabel=""
        CheckboxVariation="Checkbox-Simple"
        Name="vg-checkbox"
        OnChange={(checked) => {}}
        OnHover={() => { }}
      />
    ),
    "Badge Inline": (
      <VgBadge
        BadgeSize="inline"
        BadgeText="Info Badge"
        BadgeVariation="defaults"
      />
    )
  },
  {
    Text: "Table Data",
    "Text - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>Table Data 2</div>
      </div>
    ),
    "Text & Link - Two Lines": (
      <div>
        <div>Table Data</div>
        <div>
          <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
        </div>
      </div>
    ),
    "Input Field": (
      <VgInput
        CustomMsg=""
        InputId=""
        InputTitle="Title:"
        Name=""
        OnBlur={() => { }}
        OnChange={(e) => {}}
        PlaceHolder="Input Field"
        SetValue=""
        UrlPrefix=""
        Validation="none"
      />
    ),
    "Dropdown": (
      <VgDropdown
        AutoFocus
        CallBackTimeCount={0}
        ClassNamePrefix="vg-select2-dropdown"
        CustomClassNamePrefix="custom-class"
        CustomPlaceholderName="Selected"
        DefaultValue={[]}
        DropdownClosingName=""
        DropdownData={[
          {
            label: "Colours",
            options: [
              {
                label: "Oceans",
                value: "ocean",
              },
              {
                label: "Blue",
                value: "blue",
              },
              {
                label: "Purple",
                value: "purple",
              },
              {
                label: "Red",
                value: "red",
              },
              {
                label: "Orange",
                value: "orange",
              },
              {
                label: "Yellow",
                value: "yellow",
              },
              {
                label: "Green",
                value: "green",
              },
              {
                label: "Forest",
                value: "forest",
              },
              {
                label: "Slate",
                value: "slate",
              },
              {
                label: "Silver",
                value: "silver",
              },
            ],
          },
        ]}
        DropdownId=""
        DropdownName=""
        DropdownWidth={350}
        SearchPlaceholder="Search"
        IsApplyButtonOn
        DropdownClosed={() => { }}
        GroupOptions
        Multi
        OpenFromBody
        Required
        IsSearchable
        ShowCheckBoxInGroup
        ShowCustomMessage="No results found. Please try another search."
        MenuPlacement="auto"
        NativeActionValue={13}
        Placeholder="Select"
        // RequiredMessage="This field is required"
        RightSwipeEvent
        SetCustomPlaceholder
        ShowHideFooter={2}
        ShowSelectAllSelectNone
        TabIndex={0}
        VagaroToolkit={1}
        VirtualDropdownHeight={300}
        onChange={(e: any) => {}}
      />
    ),
    "Ghost Button": (
      <VgButton
        ButtonIcon="plus"
        ButtonVariant="ghost"
        ButtononClick={(e: any) => {}}
        ButtononHover={() => { }}
      >
        Button
      </VgButton>
    ),
    "Grabber and Text": (
      <div className="drag-text">
        <i className="fa-solid fa-bars"></i> Table Data
      </div>
    ),
    Toggle: (
      <VgToggle
        Description="This is an additional description for the switch"
        Name=""
        OnChange={(checked) => {}}
        Title="Toggle Name Here"
        ToggleId="5"
        ToggleVariation="Default"
      />
    ),
    Link: (
      <VgLinkControl LinkControlText="Table Data" URL="" UnderLine="none" />
    ),
    "3 Dot Action": (
      (
        <VgButton
          ButtonIcon=""
          ButtonVariant="action"
          ButtononClick={() => { }}
          ButtononHover={() => { }}
          actionbutton="vertical"
        />
      )
    ),
    "Checkbox": (
      <VgCheckbox
        CheckBoxId="5"
        CheckboxLabel=""
        CheckboxVariation="Checkbox-Simple"
        Name="vg-checkbox"
        OnChange={(checked) => {}}
        OnHover={() => { }}
      />
    ),
    "Badge Inline": (
      <VgBadge
        BadgeSize="inline"
        BadgeText="Info Badge"
        BadgeVariation="defaults"
      />
    )
  },
];

export const TableInfoColumn = [
  {
    DataValue: "Text",
    Dataheader: "Text",
    Sorting: false,

  },
  {
    DataValue: "Text - Two Lines",
    Dataheader: "Text - Two Lines ",
    Sorting: false,
  },
  {
    DataValue: "Text & Link - Two Lines",
    Dataheader: "Text & Link - Two Lines",
    Sorting: false,
  },
  {
    DataValue: "Input Field",
    Dataheader: "Input Field ",
    Sorting: false,
  },
  {
    DataValue: "Dropdown",
    Dataheader: "Dropdown ",
    Sorting: false,
  },
  {
    DataValue: "Ghost Button",
    Dataheader: "Ghost Button ",
    Sorting: false,
  },
  {
    DataValue: "Grabber and Text",
    Dataheader: "Grabber and Text",
    Sorting: false
  },
  {
    DataValue: "Toggle",
    Dataheader: "Toggle",
    Sorting: false
  },
  {
    DataValue: "Link",
    Dataheader: "Link",
    Sorting: false
  },
  {
    DataValue: "3 Dot Action",
    Dataheader: "3 Dot Action",
    Sorting: false
  },
  {
    DataValue: "Checkbox",
    Dataheader: "Checkbox",
    Sorting: false
  },
  {
    DataValue: "Badge Inline",
    Dataheader: "Badge Inline",
    Sorting: false
  },
]

export const PayRollColumnData = [
  { DataValue: "employee", Dataheader: "Employee", sticky: false, Sorting: false },
  { DataValue: "hourlyPayRate", Dataheader: "Hourly Pay Rate", sticky: false, Sorting: false },
  { DataValue: "employeeCardID", Dataheader: "Employee Card ID", sticky: true, Sorting: false },

  // { DataValue: "Add", Dataheader: "", Width: 0, Sorting: false },
];



export const PayRollRowData = [
  {
    "employee": "03sep1 multi",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "03sep1",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "multi",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "10th jun",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "0607 employee",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "22 aug vg 1816",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "10th jun",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Admin Admin with Calendar",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Admin Admin with Calendar",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Albert Yogan",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Amer gracecheer11",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Andrea Harris",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "demmy demmy",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Dhruv 1",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Eleven Aug	",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Happy1 Singh",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Jaydeep S",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "John Kallis",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Latenight Technology",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Lucky d Singh",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Mayur Parekh",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "Title": "Toggle Name Here",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "ToggleId": "2",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
];

export const TieredColumnData = [
  { DataValue: "employee", Dataheader: ["", "Employee", ""], sticky: false, Sorting: false },
  {
    DataValue: "hourlyPayRate", Dataheader: [
      "Tier 1",
      "$0",
      "$0+",
    ]
    , sticky: false, Sorting: false
  },
  { DataValue: "employeeCardID", Dataheader: "Employee Card ID", sticky: true, Sorting: false },
];



export const TieredRowData = [
  {
    "employee": "03sep1 multi",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "03sep1",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "multi",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "10th jun",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "0607 employee",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "22 aug vg 1816",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "10th jun",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Admin Admin with Calendar",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Admin Admin with Calendar",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Albert Yogan",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Amer gracecheer11",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Andrea Harris",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "demmy demmy",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Dhruv 1",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Eleven Aug	",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Happy1 Singh",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Jaydeep S",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "John Kallis",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Latenight Technology",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "ToggleVariation": "InputToggle",
        "SetToggleOption": "%",
        "SetValue": "0",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Lucky d Singh",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
  {
    "employee": "Mayur Parekh",
    "hourlyPayRate": {
      "Toggle": [{
        "Description": "",
        "Name": "",
        "CopyHorizontal": true,
        "CopyVertical": true,
        "Title": "Toggle Name Here",
        "SetToggleOption": "%",
        "ToggleId": "1",
        "OnClick": "{() => {}}",
        "SetValue": "0",
        "ToggleVariation": "InputToggle",
        "style": ""
      }],
    },
    "employeeCardID": {
      "Input": [{
        "CustomMsg": "",
        "InputId": "3",
        "InputTitle": "",
        "Required": false,
        "Name": "",
        "OnBlur": "() => {}",
        "OnChange": "() => {}",
        "PlaceHolder": "",
        "SetValue": "",
        "UrlPrefix": "",
        "Validation": "none"
      }],
    }
  },
];



export const TableData = [
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "Admin",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": {
      "Badge": [
        {
          "BadgeSize": "inline",
          "BadgeText": "Active",
          "BadgeVariation": "positive"
        }
      ]
    },
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  },
  {
    'name': 'Molly Larsen',
    'email': 'Mollylovesoak@gmail.com',
    'cell': '(415) 944-7445',
    "Employees": (
      <div className="emp-table-data">
        <div className="profile-td">
          <VgAvatar
            AvatarSize="Small"
            NoProfile="Daniel klein"
            ProfileUrl="https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg"
          />
        </div>
        <div className="emp-list-data">
          <div className="emp-table-name">Molly Larsen</div>
          <div className="emp-table-discription">Mollylovesoak@gmail.com</div>
          <div className="emp-table-discription">(415) 944-7445</div>
        </div>
        <div className="progress-data">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle className="bg" cx="50" cy="50" r="40"></circle>
            <circle className="bg" cx="50" cy="50" r="45"></circle>
            <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDasharray: "282", strokeDashoffset: "169" }}></circle>
          </svg>
          <span className="percentage-text">40%</span>
        </div>
      </div>
    ),
    "Access Leval": "All Access",
    "Employee Type": "Service Provider",
    "Status": "",
    "renewalStatus": "Active",
    "Component": {
      "Button": [{
        "ButtonVariant": "action", "Label": ""
      }],
      "ActionPopup": ["Edit", "Delete"]
    },
  }
]

export const Tablecolumns = [
  {
    DataValue: "Employees",
    Dataheader: "Employees",
    MinWidth: 170,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Access Leval",
    Dataheader: "Access Leval",
    MinWidth: 170,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Employee Type",
    Dataheader: "Employee Type",
    MinWidth: 170,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Status",
    Dataheader: "Status",
    MinWidth: 170,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "renewalStatus",
    Dataheader: "Renewal Status",
    MinWidth: 170,
    sticky: false,
    Sorting: false,
  },
  {
    DataValue: "Component",
    Dataheader: "",
    MinWidth: 30,
    sticky: true,
    Sorting: false,
  },
]

