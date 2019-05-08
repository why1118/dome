// // 1.请用递归的方式遍历树形数据结构中的每一个节点
// const options = [
//     {
//         value: 'zhejiang',
//         label: 'Zhejiang',
//         children: [
//             {
//                 value: 'hangzhou',
//                 label: 'Hangzhou',
//                 children: [
//                     {
//                         value: 'xihu',
//                         label: 'West Lake'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         value: 'jiangsu',
//         label: 'Jiangsu',
//         children: [
//             {
//                 value: 'nanjing',
//                 label: 'Nanjing',
//                 children: [
//                     {
//                         value: 'zhonghuamen',
//                         label: 'Zhong Hua Men'
//                     }
//                 ]
//             }
//         ]
//     }
// ];
// function dom(options){
//     options.map(item=>{
//         create(item.value)
//         if(item.children){
//             dom(item.children)
//         }
//     })
// }
// dom(options)
// function create(text){
//     let tagName = document.createElement('p')
//     tagName.innerHTML = text
//     console.log(tagName)
// }


// // 2.将类似以下JSON表示的树状结构(可以无限层级)通过parseDOM函数(使用document.createElement,
//     // document.createTextNode,appendChild等方法)生成一颗DOM树(返回一个element元素)
// const JsonTree = [
//     {
//         "tagName": "ul",
//         "props": {
//             "className": "list",
//             "data-name": "jsontree"
//         }
//     },
//     {
//         "tagName": "a",
//         "props": {
//             "href": "https://www.aliyun.com",
//             "target": "_blank"
//         },
//         "children": "阿里云"
//     }
// ]
// let tagName = '';
// let props = '';
// let children = '';
// JsonTree.forEach(item=>{
//     tagName = item.tagName
//     props = item.props
//     children = item.children
//     parseDOM(tagName,props,children)
// })
// function parseDOM(tagName,props,children){
//     let tagNames = document.createElement(tagName)
//     for (var i in props) {
//         var propValue = props[i]
//         tagNames.setAttribute(i, propValue)
//     }
//     if(children){
//         let child = document.createElement('li')
//         child.innerHTML = children;
//         tagNames.appendChild(child)
//     }
//     console.log(tagNames)
// }

const list = [
    {
        title: '所有物品',
        children: [
            {
                title: "电器",
                children: [{
                    title: "电脑"
                },
                {
                    title: "手机"
                }
                ],
            },
            {
                title: "医疗电器",
                children: [{
                    title: "手术刀",
                    children: [{
                        title: "啥也不是"
                    },
                    {
                        title: "全是宝座",
                        children: [{
                            title: "报错",
                            children: [{
                                title: "否"
                            },
                            {
                                title: "s12311"
                            }
                            ],
                        },
                        {
                            title: "挫折"
                        }
                        ],
                    }
                    ],
                },
                {
                    title: "自己"
                }
                ],
            }
        ]
    }
]
var parent = document.createElement('ul');
function lists(list,parent){
    list.forEach(item=>{
        let li = document.createElement('li');
        li.innerHTML = item.title;
        if(item.children){
            lists(item.children,li)
        }
        parent.append(li)
    })
}
lists(list,parent)