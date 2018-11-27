<template>
    <div class="hero-wrap">
        <div class="hero-background"></div>
    </div>
</template>

<script>
    export default {
        name: 'Hero'
    }
</script>
<style scoped>
    .hero-wrap {
        display: block;
        width: 100%;
        height: 450px;
    }

    .hero-background {

        width: 100%;
        height: 100%;
        background-image: url("./../assets/hero.jpg");
        background-color: #cccccc;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

</style>

