import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "../src/components/Card.vue";

describe("Card", () => {
  it("renders title and subtitle", () => {
    const wrapper = mount(Card, { props: { title: "Sneakers", subtitle: "$49.99" } });
    expect(wrapper.text()).toContain("Sneakers");
    expect(wrapper.text()).toContain("$49.99");
  });

  it("renders default slot content", () => {
    const wrapper = mount(Card, { slots: { default: "<p>Body</p>" } });
    expect(wrapper.html()).toContain("Body");
  });

  it("renders footer slot only when provided", () => {
    const withoutFooter = mount(Card);
    expect(withoutFooter.find(".su-card__footer").exists()).toBe(false);

    const withFooter = mount(Card, { slots: { footer: "<button>Buy</button>" } });
    expect(withFooter.find(".su-card__footer").exists()).toBe(true);
  });
});
