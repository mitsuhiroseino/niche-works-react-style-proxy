import styleProxy from "./styleProxy";

describe("styleProxy", () => {
  const onChange = (...args) => {
    console.log(args);
  };
  const props = {
    value: "abc",
    onChange,
  };
  const style = {
    color: "#ff0000",
    backgroundColor: "#00ff00",
  };

  describe("default", () => {
    test("スタイル関連のプロパティ無し", () => {
      const styledProps = styleProxy(props, {});
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
      });
    });

    test("スタイルプロパティがオブジェクト、配列以外", () => {
      const styleFn = () => {
        return {
          borderColor: "#0000ff",
        };
      };
      const styledProps = styleProxy({ ...props, style: styleFn }, {});
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: styleFn,
      });
    });
  });

  describe("style", () => {
    test("null", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
          },
        },
        null,
        { styleProp: "style" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: {
          borderColor: "#0000ff",
        },
      });
    });

    test("object", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
          },
        },
        style,
        { styleProp: "style" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: {
          color: "#ff0000",
          backgroundColor: "#00ff00",
          borderColor: "#0000ff",
        },
      });
    });

    test("array", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
          },
        },
        [{ color: "#ff0000", backgroundColor: "#00ff00" }],
        { styleProp: "style" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: {
          color: "#ff0000",
          backgroundColor: "#00ff00",
          borderColor: "#0000ff",
        },
      });
    });

    test("empty array", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
          },
        },
        [],
        { styleProp: "style" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: {
          borderColor: "#0000ff",
        },
      });
    });

    test("null array", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
          },
        },
        [null, null, null],
        { styleProp: "style" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: {
          borderColor: "#0000ff",
        },
      });
    });
  });

  describe("styleProp", () => {
    describe("style", () => {
      test("none", () => {
        const styledProps = styleProxy(props, style, {
          styleProp: "style",
        });
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          style: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
        });
      });

      test("object", () => {
        const styledProps = styleProxy(
          {
            ...props,
            style: {
              borderColor: "#0000ff",
            },
          },
          style,
          { styleProp: "style" },
        );
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          style: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
            borderColor: "#0000ff",
          },
        });
      });

      test("object (設定済み)", () => {
        const styledProps = styleProxy(
          {
            ...props,
            style: {
              borderColor: "#0000ff",
            },
          },
          style,
          { styleProp: "style" },
        );
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          style: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
            borderColor: "#0000ff",
          },
        });
      });
    });

    describe("css", () => {
      test("none", () => {
        const styledProps = styleProxy(props, style, { styleProp: "css" });
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          css: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
        });
      });

      test("object", () => {
        const styledProps = styleProxy(
          {
            ...props,
            css: {
              borderColor: "#0000ff",
            },
          },
          style,
          { styleProp: "css" },
        );
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          css: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
            borderColor: "#0000ff",
          },
        });
      });

      test("array", () => {
        const styledProps = styleProxy(
          {
            ...props,
            css: [
              {
                borderColor: "#0000ff",
              },
            ],
          },
          style,
          { styleProp: "css" },
        );
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          css: [
            {
              color: "#ff0000",
              backgroundColor: "#00ff00",
            },
            { borderColor: "#0000ff" },
          ],
        });
      });
    });

    describe("sx", () => {
      test("none", () => {
        const styledProps = styleProxy(props, style, { styleProp: "sx" });
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          sx: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
        });
      });

      test("object", () => {
        const styledProps = styleProxy(
          {
            ...props,
            sx: {
              borderColor: "#0000ff",
            },
          },
          style,
          { styleProp: "sx" },
        );
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          sx: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
            borderColor: "#0000ff",
          },
        });
      });

      test("array", () => {
        const styledProps = styleProxy(
          {
            ...props,
            sx: [
              {
                borderColor: "#0000ff",
              },
            ],
          },
          style,
          { styleProp: "sx" },
        );
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          sx: [
            {
              color: "#ff0000",
              backgroundColor: "#00ff00",
            },
            { borderColor: "#0000ff" },
          ],
        });
      });
    });

    describe("any", () => {
      test("none", () => {
        const styledProps = styleProxy(props, style, { styleProp: "any" });
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          any: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
        });
      });

      test("object", () => {
        const styledProps = styleProxy(
          {
            ...props,
            any: {
              borderColor: "#0000ff",
            },
          },
          style,
          { styleProp: "any" },
        );
        expect(styledProps).toEqual({
          value: "abc",
          onChange,
          any: {
            color: "#ff0000",
            backgroundColor: "#00ff00",
            borderColor: "#0000ff",
          },
        });
      });
    });
  });

  describe("styleApplyMode", () => {
    test("未設定", () => {
      const styledProps = styleProxy(
        {
          ...props,
          any: {
            borderColor: "#0000ff",
          },
        },
        style,
        { styleProp: "any" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        any: {
          color: "#ff0000",
          backgroundColor: "#00ff00",
          borderColor: "#0000ff",
        },
      });
    });

    test("merge", () => {
      const styledProps = styleProxy(
        {
          ...props,
          any: {
            borderColor: "#0000ff",
          },
        },
        style,
        { styleProp: "any", styleApplyMode: "merge" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        any: {
          color: "#ff0000",
          backgroundColor: "#00ff00",
          borderColor: "#0000ff",
        },
      });
    });

    test("append", () => {
      const styledProps = styleProxy(
        {
          ...props,
          any: {
            borderColor: "#0000ff",
          },
        },
        style,
        { styleProp: "any", styleApplyMode: "append" },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        any: [
          {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
          {
            borderColor: "#0000ff",
          },
        ],
      });
    });
  });

  describe("stylePriority", () => {
    test("true & styleApplyMod=`merge`", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
            backgroundColor: "#ffffff",
          },
        },
        style,
        { styleApplyMode: "merge", stylePriority: true },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: {
          color: "#ff0000",
          backgroundColor: "#00ff00",
          borderColor: "#0000ff",
        },
      });
    });

    test("false & styleApplyMod=`merge`", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
            backgroundColor: "#ffffff",
          },
        },
        style,
        { styleApplyMode: "merge", stylePriority: false },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: {
          color: "#ff0000",
          backgroundColor: "#ffffff",
          borderColor: "#0000ff",
        },
      });
    });

    test("true & styleApplyMod=`append` & object", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
          },
        },
        style,
        { styleApplyMode: "append", stylePriority: true },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: [
          {
            borderColor: "#0000ff",
          },
          {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
        ],
      });
    });

    test("false & styleApplyMod=`append` & object", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: {
            borderColor: "#0000ff",
          },
        },
        style,
        { styleApplyMode: "append", stylePriority: false },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: [
          {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
          {
            borderColor: "#0000ff",
          },
        ],
      });
    });

    test("true & styleApplyMod=`append` & array", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: [
            {
              borderColor: "#0000ff",
            },
          ],
        },
        style,
        { styleApplyMode: "append", stylePriority: true },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: [
          {
            borderColor: "#0000ff",
          },
          {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
        ],
      });
    });

    test("false & styleApplyMod=`append` & array", () => {
      const styledProps = styleProxy(
        {
          ...props,
          style: [
            {
              borderColor: "#0000ff",
            },
          ],
        },
        style,
        { styleApplyMode: "append", stylePriority: false },
      );
      expect(styledProps).toEqual({
        value: "abc",
        onChange,
        style: [
          {
            color: "#ff0000",
            backgroundColor: "#00ff00",
          },
          {
            borderColor: "#0000ff",
          },
        ],
      });
    });
  });
});
