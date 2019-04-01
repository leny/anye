let Anye = require("..");

module.exports = {
    setUp: function(fDone) {
        Anye.clear();
        fDone();
    },

    "Anye Tests": function(oTest) {
        // Setting
        oTest.equal(
            Anye.set("simple", "/url/"),
            "/url/",
            "Anye.set should return the given URL.",
        );
        oTest.equal(
            Anye.set("one-param", "/url/:id"),
            "/url/:id",
            "Anye.set should return the given URL.",
        );

        // Counting
        oTest.equal(Anye.count(), 2, "Anye.count should return 2.");
        Anye.set("multi-params", "/url/:id/:module");
        oTest.equal(Anye.count(), 3, "Anye.count should return 3.");

        // Clearing
        Anye.clear();
        oTest.equal(Anye.count(), 0, "Anye.count() should return 0.");

        Anye.set("simple", "/url/");
        Anye.set("one-param", "/url/:id");
        Anye.set("multi-params", "/url/:id/:module");

        // Retrieving
        oTest.throws(() => {
            Anye.get("unknown");
        }, "Anye.get should throws when calling an url that is not in the store.");

        oTest.equal(
            Anye.get("simple"),
            "/url/",
            "Anye.get should return the good url.",
        );

        oTest.throws(() => {
            Anye.get("one-param");
        }, "Anye.get should throws when calling an url expecting with no params.");
        oTest.throws(() => {
            Anye.get("one-param", {foo: "bar"});
        }, "Anye.get should throws when calling an url expecting with not the attended params.");
        oTest.equal(
            Anye.get("one-param", {id: 2}),
            "/url/2",
            "Anye.get should return the good url, with the given params.",
        );
        oTest.equal(
            Anye.get("one-param", {id: "bar"}),
            "/url/bar",
            "Anye.get should return the good url, with the given params.",
        );

        oTest.throws(() => {
            Anye.get("multi-params", {id: 2});
        }, "Anye.get should throws when calling an url expecting with not the attended params.");
        oTest.equal(
            Anye.get("multi-params", {id: 2, module: "foo"}),
            "/url/2/foo",
            "Anye.get should return the good url, with the given params.",
        );
        oTest.equal(
            Anye.get("multi-params", {module: 2, id: "foo"}),
            "/url/foo/2",
            "Anye.get should return the good url, with the given params.",
        );

        // All
        oTest.deepEqual(
            Anye.all(),
            {
                simple: "/url/",
                "one-param": "/url/:id",
                "multi-params": "/url/:id/:module",
            },
            "Anye.all should return all the DataStore",
        );

        // Raw url
        oTest.throws(() => {
            Anye.raw("unknown");
        }, "Anye.raw should throws when calling an url that is not in the store.");
        oTest.equal(
            Anye.raw("simple"),
            "/url/",
            "Anye.raw should return the good url.",
        );
        oTest.equal(
            Anye.raw("one-param"),
            "/url/:id",
            "Anye.raw should return the good url.",
        );
        oTest.equal(
            Anye.url("multi-params"),
            "/url/:id/:module",
            "Anye.raw url return the good url.",
        );

        // URL Decoding
        oTest.equal(
            Anye.get("one-param", {id: "bar^"}),
            "/url/bar%5E",
            "Anye.get should return the good url, with the given params, and URL-encoded by default.",
        );
        oTest.equal(
            Anye.get("one-param", {id: "bar^"}, true),
            "/url/bar^",
            "Anye.get should return the good url, with the given params, and URL-decoded.",
        );

        // Additional parameters
        oTest.equal(
            Anye.get("simple", {id: 2, foo: "bar"}),
            "/url/?id=2&foo=bar",
            "Anye.get should return the good url and add additional params to the query string.",
        );
        oTest.equal(
            Anye.get("one-param", {id: 2, foo: "bar"}),
            "/url/2?foo=bar",
            "Anye.get should return the good url, with the given params, and add additional params to the query string.",
        );
        oTest.equal(
            Anye.get("one-param", {id: 2, foo: "bar", bar: "baz"}),
            "/url/2?foo=bar&bar=baz",
            "Anye.get should return the good url, with the given params, and add additional params to the query string.",
        );
        oTest.equal(
            Anye.get("one-param", {id: 2, foo: "bar^", bar: "baz"}, true),
            "/url/2?foo=bar^&bar=baz",
            "Anye.get should return the good url, with the given params, and add additional params to the query string, and URL-decoded.",
        );

        // Complex & nested additional parameters
        oTest.equal(
            Anye.get("one-param", {id: 2, foo: "bar", bar: [1, 2, 3]}),
            "/url/2?foo=bar&bar%5B0%5D=1&bar%5B1%5D=2&bar%5B2%5D=3",
            "Anye.get should return the good url, with the given params, and add additional params to the query string, event the complex ones, like Arrays.",
        );
        oTest.equal(
            Anye.get("one-param", {
                id: 2,
                foo: "bar",
                bar: {baz: "bar", zab: "baz"},
            }),
            "/url/2?foo=bar&bar%5Bbaz%5D=bar&bar%5Bzab%5D=baz",
            "Anye.get should return the good url, with the given params, and add additional params to the query string, event the complex ones, like Objects.",
        );
        oTest.equal(
            Anye.get(
                "one-param",
                {id: 2, foo: "bar", bar: {baz: "bar", zab: "baz"}},
                true,
            ),
            "/url/2?foo=bar&bar[baz]=bar&bar[zab]=baz",
            "Anye.get should return the good url, with the given params, and add additional params to the query string, event the complex ones, like Objects, and URL-decoded.",
        );

        // Generating
        oTest.equal(
            Anye.generate("/url/"),
            "/url/",
            "Anye.generate should return the given url.",
        );
        oTest.throws(() => {
            Anye.generate("/url/:id");
        }, "Anye.generate should throws when giving an url with params, and no giving params.");
        oTest.equal(
            Anye.generate("/url/:id", {id: 2}),
            "/url/2",
            "Anye.generate should return the given url, with the given params.",
        );
        oTest.equal(
            Anye.generate("/url/:id/:module", {id: 2, module: "foo"}),
            "/url/2/foo",
            "Anye.generate should return the given url, with the given params.",
        );
        oTest.equal(
            Anye.generate("/url/:id", {id: "bar^"}),
            "/url/bar%5E",
            "Anye.generate should return the given url, with the given params, and URL-encoded by default.",
        );
        oTest.equal(
            Anye.generate("/url/:id", {id: "bar^"}, true),
            "/url/bar^",
            "Anye.generate should return the given url, with the given params, and URL-decoded.",
        );
        oTest.equal(
            Anye.generate("/url/:id", {id: 2, foo: "bar"}),
            "/url/2?foo=bar",
            "Anye.generate should return the given url, with the given params, and add additional params to the query string.",
        );
        oTest.equal(
            Anye.generate("/url/:id", {
                id: 2,
                foo: "bar",
                bar: {baz: "bar", zab: "baz"},
            }),
            "/url/2?foo=bar&bar%5Bbaz%5D=bar&bar%5Bzab%5D=baz",
            "Anye.generate should return the given url, with the given params, and add additional params to the query string, event the complex ones, like Objects.",
        );

        // Aliases
        oTest.equal(
            Anye.store("simple", "/url/"),
            "/url/",
            "Anye.store() should behave like Anye.set().",
        );
        oTest.equal(
            Anye.retrieve("simple"),
            "/url/",
            "Anye.retrieve() should behave like Anye.get().",
        );
        oTest.equal(
            Anye.build("simple"),
            "/url/",
            "Anye.build() should behave like Anye.get().",
        );

        oTest.done();
    },
};
