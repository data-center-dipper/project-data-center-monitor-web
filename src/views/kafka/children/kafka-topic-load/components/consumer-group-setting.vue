
<template>
    <el-form :model="form" label-width="120px">
        <el-form-item label="是否开启监控">
            <el-radio-group v-model="form.resource">
                <el-radio label="开启" />
                <el-radio label="关闭" />
            </el-radio-group>
        </el-form-item>
        <el-form-item label="业务属性">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="延迟阈值">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="生命周期">
            <el-select v-model="form.region" placeholder="请选择生命周期">
                <el-option label="永久" value="shanghai" />
                <el-option label="一个月(一个月不更新自动删除)" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'

    // do not use same name with ref
    const form = reactive({
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
    })

    const onSubmit = () => {
        console.log('submit!')
    }
</script>

<style scoped></style>
