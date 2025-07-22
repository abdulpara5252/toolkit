import VgProgressBar from '../../../components/VgProgressBar/VgProgressBar';

export default {
  title: 'ProgressBar',
  component: VgProgressBar,
  tags: ['autodocs'],
  argTypes: {
    CurrentValue: {
      control: 'number',
      description: 'Current progress CurrentValue.',
    },
    MaxValue: {
      control: 'number',
      description: 'Maximum progress Value.',
    },
    ShowPoints: {
      control: 'boolean',
      description: 'Enable point-style progress indicator.',
    },
    Orientation: {
      control: { type: 'select', options: ['horizontal', 'vertical'] },
      description: 'Orientation of the progress bar.',
      if: { arg: "ShowPoints" },
    },
    Title: {
      control: 'text',
      description: 'Title displayed above or within the progress bar. Can be a plain string or a custom React element.',
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
    },
    ShowPointsBody: {
      control: {
        type: 'object',
      },
      description: 'Array of { Body } objects to display when ShowPoints is true.',
      table: {
        type: { summary: 'Array<{ Body: string | React.ReactNode }>' },
      },
    },
    BodyPosition: {
        control: { type: 'select', options: ['top', 'bottom'] },
        description: 'Where to position the Body content (only affects horizontal mode or vertical inline).',
        defaultValue: 'bottom',
    },
  },
};

export const Default = {
  args: {
    CurrentValue: 1,
    MaxValue: 4,
    ShowPoints: false,
    Orientation: 'horizontal',
    BodyPosition: 'top',
    Title: "1/4 Payment",
    ShowPointsBody: 
    [ 
      { Body: `<div style="max-width: 250px"><div style="font-size: 15px">$250.00</div><div style="margin-bottom: 4px">Due Today</div><div style="margin-bottom: 4px">Sep 1, 2022</div></div>`},
      { Body: `<div style="max-width: 250px"><div style="font-size: 15px">$250.00</div><div style="margin-bottom: 4px">Due Today</div><div style="margin-bottom: 4px">Oct 15, 2022</div></div>`},
      { Body: `<div style="max-width: 250px"><div style="font-size: 15px">$250.00</div><div style="margin-bottom: 4px">Due Today</div><div style="margin-bottom: 4px">Nov 13, 2022</div></div>`},
      { Body: `<div style="max-width: 250px"><div style="font-size: 15px">$250.00</div><div style="margin-bottom: 4px">Due Today</div><div style="margin-bottom: 4px">Dec 20, 2022</div></div>`},
    ],
  },
};