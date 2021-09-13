<template>
  <quill-editor
    class="editor"
    ref="editor"
    :content="content"
    :options="editorOptions"
    
    @change="onEditorChange($event)"
  ></quill-editor>
</template>

<script>
// @blur="onEditorBlur($event)"
// @focus="onEditorFocus($event)"
// @ready="onEditorReady($event)"
//引入quill编辑器
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    components: { quillEditor },
    name: 'editor',
    props: ['content', 'toolbar', 'theme', 'placeholder'],
    data () {
        return {
            editorOptions: {
                theme: 'snow',
                placeholder: '请输入内容',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{list: 'ordered'}, {list: 'bullet'}],
                        [{indent: '-1'}, {ident: '+1'}],
                        [{size: ['small', false, 'large', 'huge']}],
                        [{header: [1, 2, 3, 4, 5, 6, false]}],
                        [{color: []}, {background: []}],
                        [{align: []}],
                        ['clean'],
                        ['link', 'image']
                    ]
                },
                toolTips: [
                    {Choice: '.ql-bold', title: '加粗'},
                    {Choice: '.ql-italic', title: '斜体'},
                    {Choice: '.ql-underline', title: '下划线'},
                    {Choice: '.ql-header', title: '段落格式'},
                    {Choice: '.ql-strike', title: '删除线'},
                    {Choice: '.ql-blockquote', title: '块引用'},
                    {Choice: '.ql-code', title: '插入代码'},
                    {Choice: '.ql-code-block', title: '插入代码段'},
                    {Choice: '.ql-font', title: '字体'},
                    {Choice: '.ql-size', title: '字体大小'},
                    {Choice: '.ql-list[value="ordered"]', title: '有序列表'},
                    {Choice: '.ql-list[value="bullet"]', title: '无序列表'},
                    {Choice: '.ql-align', title: '对齐方式'},
                    {Choice: '.ql-color', title: '字体颜色'},
                    {Choice: '.ql-background', title: '背景颜色'},
                    {Choice: '.ql-image', title: '图像'},
                    {Choice: '.ql-video', title: '视频'},
                    {Choice: '.ql-link', title: '添加链接'},
                    {Choice: '.ql-formula', title: '插入公式'},
                    {Choice: '.ql-clean', title: '清除文字格式'},
                    {Choice: '.ql-script[value="sub"]', title: '下标'},
                    {Choice: '.ql-script[value="super"]', title: '上标'},
                    {Choice: '.ql-indent[value="-1"]', title: '向左缩进'},
                    {Choice: '.ql-indent[value="+1"]', title: '向右缩进'},
                    {Choice: '.ql-header .ql-picker-label', title: '标题大小'},
                    {Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一'},
                    {Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二'},
                    {Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三'},
                    {Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四'},
                    {Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五'},
                    {Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六'},
                    {Choice: '.ql-header .ql-picker-item:last-child', title: '标准'},
                    {Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号'},
                    {Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号'},
                    {Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号'},
                    {Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准'},
                    {Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐'},
                    {Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐'},
                    {Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐'},
                    {Choice: '.ql-align .ql-picker-item[data-value="juetify"]', title: '两端对齐'},
                ]
            }
        }
    },
    created () {
        if (this.toolbar !== undefined && this.toolbar !== null) {
            this.editorOptions.modules.toolbar = this.toolbar
        }
        if (this.theme !== undefined && this.theme !== null) {
            this.editorOptions.modules.theme = this.theme
        }
        if (this.placeholder !== undefined && this.placeholder !== null) {
            this.editorOptions.modules.placeholder = this.placeholder
        }
    },
    // mounted () {
    //     this.autoTip()
    // },
    methods: {
        // autoTip () {
        //     document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
        //     for (let item of this.toolTips) {
        //         let tip = document.querySelector('.quill-editor' + item.Choice)
        //         if (!tip) continue
        //         tip.setAttribute('title', item.title)
        //     }
        // },
        // 内容发生变化时
        onEditorChange ({quill, html, text}) {
            this.$emit('change', html)
            console.log(quill + text);
        }

    }
}
</script>

<style>

</style>