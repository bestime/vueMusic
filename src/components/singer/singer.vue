<style scoped>
    .singer{position:fixed;top:150px;bottom:0;width:100%;}
</style>

<template>
    <div class="singer">
    </div>
</template>

<script>
    import {getSingerList} from '@/api/singer'
    import {ERR_OK} from '@/api/config'
    export default {
        data() {
            return {
                singers:[]
            }
        },
        created() {
            this._getSingerList()
        },
        methods: {
            _getSingerList() {
                getSingerList().then((res) => {
                    console.log(res)
                })
            }
        }
    }
</script>
