// 1.请用递归的方式遍历树形数据结构中的每一个节点
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake'
                    }
                ]
            }
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men'
                    }
                ]
            }
        ]
    }
];
function dom(options){
    options.map(item=>{
        create(item.value)
        if(item.children){
            dom(item.children)
        }
    })
}
dom(options)
function create(text){
    let tagName = document.createElement('p')
    tagName.innerHTML = text
    console.log(tagName)
}


// 2.将类似以下JSON表示的树状结构(可以无限层级)通过parseDOM函数(使用document.createElement,
    // document.createTextNode,appendChild等方法)生成一颗DOM树(返回一个element元素)
const JsonTree = [
    {
        "tagName": "ul",
        "props": {
            "className": "list",
            "data-name": "jsontree"
        }
    },
    {
        "tagName": "a",
        "props": {
            "href": "https://www.aliyun.com",
            "target": "_blank"
        },
        "children": "阿里云"
    }
]
let tagName = '';
let props = '';
let children = '';
JsonTree.forEach(item=>{
    tagName = item.tagName
    props = item.props
    children = item.children
    parseDOM(tagName,props,children)
})
function parseDOM(tagName,props,children){
    let tagNames = document.createElement(tagName)
    for (var i in props) {
        var propValue = props[i]
        tagNames.setAttribute(i, propValue)
    }
    if(children){
        let child = document.createElement('li')
        child.innerHTML = children;
        tagNames.appendChild(child)
    }
    console.log(tagNames)
}