<template>
<div id="app">
    <textarea v-model="input" :value="input" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
</div>
</template>

<script>
var markdown = require('markdown').markdown;

export default {
    name: 'app',
    data() {
        return {

            input: `
# Marked
This is pretty cool!
`
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.$http.get(window.location.pathname + '/data').then((response) => {
                this.input = response.body.markdown;
            }) })
            this.$http.post(window.location.pathname, {
            "html": this.input}).then(function() {
            },function(err) {
                console.log(err);
            });

    },


watch: {
    input: function (newInput)  {
        this.$http.post(window.location.pathname, {
        "html": newInput}).then(function() {
        },function(err) {
            console.log(err);
        });
    }
},

    computed: {
        compiledMarkdown: function() {

            return markdown.toHTML(this.input);
        }
    },
    methods: {
        update: function(e) {
            this.input = e.target.value

        }
    }
}
</script>

<style>
html,
body,
#app {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
}

textarea,
#app div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
}

textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
}

code {
    color: #f66;
}
</style>
