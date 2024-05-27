type BarProps = {
  name: string;
  to: string;
  location: string;
  component: React.JSX.Element;
  breakPoint?: boolean;
};

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  partnerTeams: string;
  status: string;
  timeCreated: number;
  timeCompleted: number | null;
  deadline: number;
};
