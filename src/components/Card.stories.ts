import type { Meta, StoryObj } from "@storybook/vue3";
import Card from "./Card.vue";
import Button from "./Button.vue";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Product: Story = {
  args: {
    title: "Running Sneakers",
    subtitle: "$49.99",
  },
  render: (args) => ({
    components: { Card, Button },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" style="max-width: 280px">
        <p>Lightweight running shoes with breathable mesh.</p>
        <template #footer>
          <Button block>Add to cart</Button>
        </template>
      </Card>
    `,
  }),
};
