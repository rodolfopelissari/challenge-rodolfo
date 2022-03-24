<template>
    <div class="page-title">
        <br>
        <span class="text-h5"><strong>{{ title }}</strong></span>
        <p>{{ subTitle }}</p>
        <hr>
        <br>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: [
        'title',
        'subTitle'
    ]
}
</script>

<style>

</style>