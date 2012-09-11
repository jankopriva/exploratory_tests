var config = module.exports;

config["Javascript and frameworks exploratory tests"] = {
    rootPath: ".",
    environment: "browser", // or "node"
    sources: [
        "ember/ember-runtime.js"
    ],
    tests: [
        "javascript/*_test.js",
        "ember/*_test.js"
    ]
};