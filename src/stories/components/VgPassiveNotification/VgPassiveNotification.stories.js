
import VgPassiveNotification from '../../../components/VgPassiveNotification/VgPassiveNotification';

export default {
    title: 'Passive Notification',
    component: VgPassiveNotification,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `Passive notifications provide information to the user in a banner format. They are used to inform the user of the status of an action, whether it has succeeded or failed. If an action has failed, the Passive Notification indicates that there was a server issue that caused it to fail. If the action failed due to misinput from the user, use a Popup instead.,`
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        NotificationTitle: {
            control: 'text',
            description: `The NotificationTitle allows users to input a custom title for a notification, which will be displayed as the headline when the notification is triggered. It is commonly used in messaging or alert systems to provide a clear and concise summary of the notification's content.`,
        },
        Icon: {
            control: 'boolean',
            description: 'The Icon property is a boolean that determines whether an icon should be displayed within a component. When set to true, an icon is shown; when set to false, no icon is rendered, offering flexibility in UI customization.',
        },
        types: {
            control: { type: 'radio' },
            options: ['positive', 'warning', 'error'],
            description: "Change type of notification",
            table: {
                disable: true,
            },
        },
        show: {
            control: 'boolean',
            description: "Change type of notification",
            table: {
                disable: true,
            },
        },
        Duration: {
            control: 'number',
            description: `The duration property allows users to specify a time interval in milliseconds, controlling how long an action or animation lasts. This is commonly used in timers, animations, or notifications to define the length of time before completion or dismissal.`,
        },
        TopMessage: {
            control: 'boolean',
            description: `The TopMessage property is a boolean that determines whether a message should be displayed at the top of a component or page. When set to true, it indicates that a message will be shown at the top, typically used for alerts or important notifications.`,
        },
        OnClose: {
            action: 'onClose',
            table: {
                category: "Events",
            },
            description: 'Callback fired when the notification auto-hides (useful for setting `show = false`).',
        },
    },
};

export const Positive = {
    args: {
        NotificationTitle: 'This is a banner notification',
        Icon: true,
        types: 'positive',
        show: true,
        TopMessage: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays a green banner with a checkmark icon, indicating a successful or completed action.',
            },
        },
    },
}
export const Warning = {
    args: {
        NotificationTitle: 'This is a banner notification',
        Icon: true,
        types: 'warning',
        show: true,
        TopMessage: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows an orange banner with a warning icon, signaling a potential issue or caution.',
            },
        },
    },
}
export const Error = {
    args: {
        NotificationTitle: 'This is a banner notification',
        Icon: true,
        types: 'error',
        show: true,
        TopMessage: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Presents a red banner with an error icon, representing a failure or critical issue that needs attention.',
            },
        },
    },
}
