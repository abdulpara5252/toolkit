import VgAlert from "../../../components/VgAlert/VgAlert";

export default {
  title: "Alert",
  component: VgAlert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Alerts are used to capture user attention before proceeding. You can control icon, title, buttons and behavior using the panel.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Icon: {
      control: { type: "select" },
      options: ["none", "warning", "success", "delete"],
      description: "Select the icon type for the alert.",
    },
    Title: {
      control: "text",
      description: "Main title of the alert popup.",
    },
    Description: {
      control: "text",
      description: "Content or explanation inside the alert.",
    },
    ConfirmText: {
      control: "text",
      description: "Label for the confirm button.",
    },
    CancelText: {
      control: "text",
      description: "Label for the cancel button.",
    },
    ShowFooter: {
     control: "boolean",
     description: "Controls whether the footer (e.g., confirm and cancel buttons) is displayed in the popup."
    },
    Duration: {
      control: 'number',
      description: 'Duration (in milliseconds) before the alert automatically closes. Set to 0 for no auto-close.',
    },
    OnConfirm: {
      action: "confirmed",
      description: "Triggered on confirm button click.",
      table: { category: "Events" },
    },
    OnCancel: {
      action: "cancelled",
      description: "Triggered on cancel button click.",
      table: { category: "Events" },
    },
    OnClose: {
      action: "closed",
      description: "Triggered on any button interaction.",
      table: { category: "Events" },
    },
  },
};

export const None = {
  args: {
    Icon: "none",
    Title: "None",
    Description: "This is a basic alert without any icon.",
    ConfirmText: "Got it",
    CancelText: "Dismiss",
    ShowFooter: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays an alert without an icon. Useful for neutral messages.",
      },
    },
  },
};

export const Warning = {
  args: {
    Icon: "warning",
    Title: "Warning",
    Description: "Are you sure you want to continue with this risky operation?",
    ConfirmText: "Proceed",
    CancelText: "Cancel",
    ShowFooter: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays a warning alert to caution the user before proceeding.",
      },
    },
  },
};

export const Success = {
  args: {
    Icon: "success",
    Title: "Success",
    Description: "Your operation was completed successfully.",
    ConfirmText: "Great!",
    CancelText: "Close",
    ShowFooter: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays a success alert to confirm a successful action.",
      },
    },
  },
};

export const Error = {
  args: {
    Icon: "delete",
    Title: "Error",
    Description: "Something went wrong while processing your request.",
    ConfirmText: "Retry",
    CancelText: "Cancel",
    ShowFooter: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Displays an error alert to indicate something has failed.",
      },
    },
  },
};
