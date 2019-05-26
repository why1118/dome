import React from 'react'

export default Component=>{
    return class extends React.Component{
        scroll(){
            console.log(123);
            let imgs = [...this.scrollRef.querySelectorAll('img[data-src]')];
            imgs.forEach(item=>{
                if (item.src == item.dataset.src){
                    return;
                }
                let rect = item.getBoundingClientRect();
                if (rect.top >=0 && rect.top <= window.innerHeight && rect.left >= 0 && rect.right >= 0){
                    item.src = item.dataset.src;
                }
            })
        }

        // 函数节流，一段时间内允许触发一次
        throttle(func, delay){
            let start = +new Date();
            
            return function(){
                let cur = +new Date();
                if (cur - start > delay){
                    start = cur;
                    setTimeout(()=>{
                        func();
                    }, delay);
                }
            }
        }

        // 函数防抖，一段时间连续触发只会执行最后一次
        debounce(func, delay){
            let time = 0;
            
            return function(){
                clearTimeout(time);
                time = setTimeout(()=>{
                    func();
                }, delay)
            }
        }

        componentDidMount(){
            let scrollEle = this.scrollRef.children[0];
            // 使用节流
            // let scroll = this.throttle(this.scroll.bind(this), 3000);
            
            // 使用防抖
            let scroll = this.debounce(this.scroll.bind(this), 3000);
            
            scrollEle.addEventListener('scroll', ()=>scroll());
            this.scroll();
        }

        render(){
            return <div ref={scroll=>this.scrollRef=scroll} style={{height: '100%'}}>
                <Component {...this.props}></Component>
            </div>
        }
    }
}