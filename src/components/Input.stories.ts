import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Input from "./Input.vue";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref("");
      return { args, value };
    },
    template: `<Input v-bind="args" v-model="value" />`,
  }),
  args: { label: "Email", placeholder: "you@example.com" },
};

export const WithError: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref("");
      return { args, value };
    },
    template: `<Input v-bind="args" v-model="value" />`,
  }),
  args: { label: "Email", error: "Email is required" },
};
