import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "../src/components/Input.vue";

describe("Input", () => {
  it("renders the label", () => {
    const wrapper = mount(Input, { props: { modelValue: "", label: "Email" } });
    expect(wrapper.text()).toContain("Email");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(Input, { props: { modelValue: "" } });
    const input = wrapper.find("input");
    await input.setValue("hello");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["hello"]);
  });

  it("shows the error message and error class", () => {
    const wrapper = mount(Input, { props: { modelValue: "", error: "Required" } });
    expect(wrapper.text()).toContain("Required");
    expect(wrapper.find("input").classes()).toContain("su-input__field--error");
  });
});
