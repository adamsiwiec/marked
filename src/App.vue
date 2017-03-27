<template>
<div id="app">
    <div class="container-fluid" >
    <div class="row">
    <textarea class ="box col-6" v-model="input" :value="input" @input="update"></textarea>
    <div class = "box output col-6" v-html="compiledMarkdown"></div>

</div>
</div>

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


<style src="./css/grid.css" />
<style src="./css/styles.css" />

<style>
html,
body,
#app {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
}

textarea,
.output {

    height: 100vh;

    padding-top: 20px;
}

textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px 40px !important;
}

code {
    color: #f66;
}

#app {
    width: 100vw;
    height:100vh;
}

.row {
    height: 100vh;
}

.eye {

    position: fixed;
    z-index: 10;
    bottom: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
}
</style>
