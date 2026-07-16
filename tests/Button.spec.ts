import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../src/components/Button.vue";

describe("Button", () => {
  it("renders slot content", () => {
    const wrapper = mount(Button, { slots: { default: "Click me" } });
    expect(wrapper.text()).toBe("Click me");
  });

  it("applies the variant class", () => {
    const wrapper = mount(Button, { props: { variant: "danger" } });
    expect(wrapper.classes()).toContain("su-button--danger");
  });

  it("emits click when not disabled", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("does not fire native click when disabled", async () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.attributes("disabled")).toBeDefined();
  });
});
