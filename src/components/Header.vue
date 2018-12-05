<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="success">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar variant="faded" type="light">
                <b-navbar-brand href="/" to="/">
                    <img src="./../assets/blockchain.png" height="30" class="d-inline-block align-top" alt="Brand">
                </b-navbar-brand>
            </b-navbar>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/hw2">HW 2</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/hw3#mainTURN">HW 3</router-link>
                    </li>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <li class="nav-item">
                        <router-link class="nav-link" to="/users">Users</router-link>
                    </li>


                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'Header',

    }


</script>

<style scoped>

</style>
