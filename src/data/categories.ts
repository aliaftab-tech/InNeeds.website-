export interface Category {
  id: number;
  title: string;
  image: string;
}

export const baseCategories: Category[] = [
  { id: 1, title: "Winter Relief", image: "/campaign_flat_1.jpg" },
  { id: 2, title: "Emergency", image: "/campaign_flat_6.jpg" },
  { id: 3, title: "Education", image: "/campaign_flat_7.jpg" },
  { id: 4, title: "Healthcare", image: "/campaign_flat_2.jpg" },
  { id: 5, title: "Environment", image: "/campaign_flat_3.jpg" },
  { id: 6, title: "Food Security", image: "/campaign_flat_5.jpg" },
  { id: 7, title: "Animal Welfare", image: "/campaign_flat_4.jpg" },
];
