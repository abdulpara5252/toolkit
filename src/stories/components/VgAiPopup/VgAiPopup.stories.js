import VgAiPopup from '../../../components/VgAiPopup/VgAiPopup';


const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "uplifting", label: "Uplifting" },
  { value: "inspirational", label: "Inspirational" },
  { value: "trendy", label: "Trendy" },
  { value: "Gentle & Caring", label: "Gentle & Caring" },
  { value: "motivational", label: "Motivational" },
  { value: "energetic", label: "Energetic" },
];

const AIData = [{
  Index: 0,
  InputDescription: "I am salon professional Nikunj sir",
  Tone: "energetic",
  Range: 100,
},
{
  Index: 1,
  InputDescription: "I am salon professional Sagar Battul",
  Tone: "trendy",
  Range: 75,
},
{
  Index: 2,
  InputDescription: "I am salon professional The issue arises from the fact that when you're updating the history in your",
  Tone: "casual",
  Range: 25,
},
{
  Index: 3,
  InputDescription: "I am salon professional The ButtonTitle property allows users to input custom text for the button that triggers the opening of the popup component. This title defines the label displayed on the button, guiding users on its function.",
  Tone: "motivational",
  Range: 50,
},
{
  Index: 4,
  InputDescription: "I am salon professional Sagar Battul",
  Tone: "professional",
  Range: 0,
},
];

export default {
  title: 'AiPopup',
  component: VgAiPopup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Popup UI where title and description are available along with Button',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    RawData: AIData,
  },
  argTypes: {
    RawData: {
      control: { type: 'object' },
      description: 'The RawData property enables users to pass JSON data directly into the AI component for display and processing. This allows for dynamic content rendering, providing structured data for the AI to interpret and present.',
    },
    ToneMetadata: {
      description: "The ToneMetadata property allows users to input JSON data defining tone metadata, which specifies the desired tone or mood for content. This helps the AI component interpret and adjust the response style accordingly, enhancing communication relevance.",
    },

    OnClickClose: {
      action: 'clicked',
      description: 'The OnClickClose event triggers an action when a user clicks to close a popup or modal, allowing for custom behavior upon closure. This event is useful for managing cleanup, saving state, or initiating follow-up actions as needed.',
      table: {
        category: 'Events',
      },
      OnBlur: {
        action: "onBlur",
        description: `The onBlur event for a Ai popup is triggered when the Ai popup loses focus, typically when a user clicks or tabs out of the field. This event is often used for validation or updating state after the user finishes interacting with the Ai popup`,
        table: {
          category: "Events",
        },
      },
    },

    OnClickUseThisText: {
      action: 'clicked',
      description: 'The OnClickUseThisText event activates when a user selects a "Use This Text" option, applying or inserting the chosen text. This event streamlines text selection processes, enabling quick content updates or input insertion.',
      table: {
        category: 'Events',
      },
    },

    OnChangeTone: {
      action: 'clicked',
      description: 'The OnChangeTone event triggers when a user selects a different tone, allowing dynamic adjustments to content style. This event helps adapt responses or text to match the selected tone, enhancing customization and user engagement.',
      table: {
        category: 'Events',
      },
    },

    OnChangeRange: {
      action: 'clicked',
      description: 'The OnChangeRange event activates when a user adjusts a range value, such as a slider, updating the displayed or applied range dynamically. This event enables real-time feedback and control over settings within specified limits.',
      table: {
        category: 'Events',
      },
    },

    OnClickPrevious: {
      action: 'clicked',
      description: 'The OnClickPrevious event triggers when a user clicks a "Previous" button, navigating to the prior screen or content. This event supports seamless backward navigation in multi-step processes or paginated views.',
      table: {
        category: 'Events',
      },
    },

    OnClickNext: {
      action: 'clicked',
      description: 'The OnClickNext event activates when a user clicks a "Next" button, moving them to the following screen or content. This event facilitates smooth forward navigation in sequences or multi-step workflows.',
      table: {
        category: 'Events',
      },
    },

    OnClickCancle: {
      action: 'clicked',
      description: 'The OnClickCancle event triggers an action when a user clicks to close a popup or modal, allowing for custom behavior upon closure. This event is useful for managing cleanup, saving state, or initiating follow-up actions as needed.',
      table: {
        category: 'Events',
      },
    },
    

    OnClickRegenerate: {
      action: 'clicked',
      table: {
        category: 'Events',
      },
    },

    onApiResponse: {
      action: 'apiResponse',  
      description: 'The onApiResponse event is triggered when the AI component receives a response from an API call. This event allows developers to handle the response data, update the UI, or perform additional actions based on the API response.',
      table: {
        category: 'Events',
      },
    },

    onApiError: {
      action: 'apiError', 
      description: 'The onApiError event is triggered when an error occurs during an API call made by the AI component. This event allows developers to handle errors gracefully, providing feedback to users or logging the error for debugging purposes.', 
      table: {
        category: 'Events',
      },
    },

    NativeAction: {
      control: "number",
      table: { disable: true }
    },
    Footer: {
      control: "number",
      table: { disable: true }
    },
    TimerCount: {
      control: "number",
      table: { disable: true }
    },
    IsFullLength: {
      control: "boolean",
      table: { disable: true }
    },
    CloseBackTitle: {
      control: "string",
      table: { disable: true }
    },
    VagaroToolkit: {
      control: "Number",
      type: { name: "Number" },
      table: { disable: true },
      description:
        "The VagaroToolkit property, when set to a Number value",
    },
    Name: {
      control: "text",
      type: { name: "string" },
      table: { disable: true },
      description: "The Name property allows users to assign a custom name to a component, serving as a developer reference. This helps in identifying and managing components efficiently during development and debugging."
    },
    AiControlId: { table: { disable: true }, control: "string" },
    CharacterCountEnable: {
      control: 'boolean',
      description: 'The CharacterCountEnable property toggles the visibility of a character counter for text input fields. When enabled, it displays the current character count, helping users track their input length against any specified limits.',
    },
    MaximumLength: {
      control: 'number',
      description: 'The MaximumLength property sets the maximum number of characters allowed in the text input. This helps enforce content length restrictions and maintains consistency in user input.',
    },
    setSubmit: {
      table: { disable: true },
      description: 'Internal state handler for submit, not for external use.'
    },
    isSubmit: {
      table: { disable: true },
      description: 'Internal state flag for submit, not for external use.'
    },
  },
};

export const AiPopup = (args) => {
  const { FooterButton } = args;

  const getFooterButtonsProps = () => {
    if (FooterButton === 'both') {
      return {
        OnClickPrimary: args.OnClickPrimary,
        OnClickSecondary: args.OnClickSecondary,
      };
    } else if (FooterButton === 'primaryButton') {
      return {
        OnClickPrimary: args.OnClickPrimary,
      };
    } else if (FooterButton === 'secondaryButton') {
      return {
        OnClickSecondary: args.OnClickSecondary,
      };
    }
    return {};
  };

  return (
    <VgAiPopup
      AiControlId='AiControlId'
      VagaroToolkit={args.VagaroToolkit}
      NativeAction={args.NativeAction}
      Footer={args.Footer}
      TimerCount={args.TimerCount}
      IsFullLength={args.IsFullLength}
      CloseBackTitle={args.CloseBackTitle}
      ToneMetadata={args.ToneMetadata}
      OnChangeRange={args.OnChangeRange}
      OnChangeTone={args.OnChangeTone}
      OnClickUseThisText={args.OnClickUseThisText}
      OnClickCancle={args.OnClickCancle}
      OnClickClose={args.OnClickClose}
      OnClickRegenerate={args.OnClickRegenerate}
      OnClickPrevious={args.OnClickPrevious}
      OnClickNext={args.OnClickNext}
      RawData={args.RawData}
      CharacterCountEnable={args.CharacterCountEnable}
      MaximumLength={args.MaximumLength}
      Name={args.Name = ""}
      moduleContext={args.moduleContext}
      baseUrl={args.baseUrl}
      ApiRequestParams={args.ApiRequestParams}
      onApiResponse={args.onApiResponse}
      onApiError={args.onApiError}
      {...getFooterButtonsProps()}
    />
  );
};

AiPopup.args = {
  ToneMetadata: toneOptions,
  VagaroToolkit: 1,
  NativeAction: 13,
  CloseBackTitle: "From Control",
  Footer: 2,
  TimerCount: 0,
  IsFullLength: false,
  RawData: AIData,
  OnClickCancle: () => {},
  OnClickClose: () => {},
  OnClickUseThisText: () => {},
  OnClickRegenerate: (e) => {},
  OnChangeTone: (e) => {},
  OnChangeRange: (e) => {},
  OnClickPrevious: (e) => {},
  OnClickNext: (e) => {},
  CharacterCountEnable: false,
  MaximumLength: 1500,
  // Advanced API props
  moduleContext: "inventory",
  baseUrl: "https://dev14.bookitall.com",
  ApiRequestParams: {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      Connection: "keep-alive",
      "X-Requested-With": "XMLHttpRequest",
      merchantid: "cUQLl8ISTPyutak3C1An7Q==",
      userid: "QCVaPVkzGPDuPKzQLLSIdg==",
      token1: "U2FsdGVkX19yF/VR6GKgU8C2OEaYqB1iULjCXNwVsg4=",
      token2: "U2FsdGVkX19T43sle6Bpj4YIVZERMXEZ0zWudr1u6Fw=",
      token3: "U2FsdGVkX1/6uQ8TzyrSPy+s1bOKSc0R4cTfG0/IFoQ=",
      token4: "U2FsdGVkX1+K5ToCq+qBSXIFQo2d75k1kuahH6rE/gQ=",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      Cookie: "visid_incap_2405801=nKrJ6XT8TJOIvcNqavRFnp/AoGcAAAAAQUIPAAAAAACbYGnsLL43zOZsjWrKCifW; _vopt=%22accepted%22; _ga=GA1.1.541524598.1738588397; _clck=m6rooe%7C2%7Cftw%7C0%7C1862; _uetvid=e5cae0a0e3a711ef840afb7ba07f32a3; _ga_6V5L0PLMBF=GS1.1.1740994171.2.1.1740994889.0.0.0; proximitystate_v3=%7B%22lat%22%3A%2237.77493%22%2C%22long%22%3A%22-122.4194%22%2C%22countryid%22%3A%221%22%2C%22zip%22%3A%22%22%2C%22city%22%3A%22San+Francisco%22%2C%22state%22%3A%22ca%22%2C%22stateName%22%3A%22California%22%2C%22currencysymbol%22%3A%22%24%22%2C%22businesstypes%22%3A%22%22%2C%22service%22%3A%22%22%2C%22vagaroURL%22%3A%22%22%2C%22titleTimesTamp%22%3A%22%22%2C%22utcOffset%22%3A0%2C%22timeZoneOffSet%22%3A-8.0%2C%22isSupportDayLight%22%3Atrue%7D; amp_c57244=DlodAd7SYzU3JAciyrtCvP...1ilibi9vk.1ilibirrc.45.26.6b; _ga_BGSFEW1QY1=GS1.1.1741151611.20.1.1741151857.59.0.0; __stripe_mid=1d6d9c5d-3ace-4991-b5a8-b756086ed52a0b9377; LastSeenFeatureId=4; ai_user=+OXmam53JZNsOcuFvUbF8b|2025-06-17T09:49:58.813Z; isSignupValue=false; isLoginValue=true; loginTypeValue=1; vPowerV2=buqpptc2fla4tvujjczjggmx; cmsmaster=%22public%22; __AntiXsrfToken=419c7f6c53f44f16b09eb7b7c4354af3; s_utkn=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMzUyMDgzMDk0fDUxMzI2NzMiLCJuYmYiOjE3NTIzMTg0MDksImV4cCI6MTc1NDkxMDQwOSwiaWF0IjoxNzUyMzE4NDA5LCJpc3MiOiJhcGkudmFnYXJvLmNvbSIsImF1ZCI6IlFDVmFQVmt6R1BEdVBLelFMTFNJZGc9PSJ9.xrZiigLIjD4ef8kI7gSUSJFwN7VCi03zpM0VOv2EyKw; s_eB=U2FsdGVkX1~xPr1aHtEqiEv4YwYLVjki25aaVIIYlMg=; rpt_data={\"MerchantId\":\"cUQLl8ISTPyutak3C1An7Q==\",\"UserId\":\"QCVaPVkzGPDuPKzQLLSIdg==\",\"grouptoken\":\"US02\",\"Theme\":\"assets/css/Theme/theme10.css?v=20250704112736\"}; s_eU=U2FsdGVkX1-LRrDLNKnZrWXAUxr4R28krmIS5RK5rqM=; s_themeid=U2FsdGVkX1-5e8k3NZQMbCYBMnCN65TNNuQVQo4W0gk=; _ga_2L62EDJ2V9=GS2.1.s1752318368$o21$g1$t1752318412$j16$l0$h0; VagaroMenuId=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMzUyMDgzMDk0fDUxMzI2NzMiLCJuYmYiOjE3NTIzMTg0MDksImV4cCI6MTc1NDkxMDQwOSwiaWF0IjoxNzUyMzE4NDA5LCJpc3MiOiJhcGkudmFnYXJvLmNvbSIsImF1ZCI6IlFDVmFQVmt6R1BEdVBLelFMTFNJZGc9PSJ9.xrZiigLIjD4ef8kI7gSUSJFwN7VCi03zpM0VOv2EyKw; incap_ses_707_2405801=zamtbRAAyAN5J+auBMXPCaT4dWgAAAAA5iqG9KsAXkMrPCiIzsDn6Q==; __stripe_sid=f07a98da-2923-453d-b9c2-579676cabb12a898c7"
    },
    dataKey: "data",
    responseType: "Single",
  },
  onApiResponse: (response) => console.log("API Response:", response),
  onApiError: (error) => console.error("API Error:", error),
};
