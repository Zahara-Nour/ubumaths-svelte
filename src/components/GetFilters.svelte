<script>


    export let onFilters

    $: if (filters) {
        onFilters(filters)
    }

</script>