export interface MenuItem {
  icon?: string;
  name: string;
  index: string | number;
  children?: MenuItem[];
}
