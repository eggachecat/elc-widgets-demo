import React, { useState, useEffect } from 'react';

// 主动的组件: 数据获取自动完成
function withActive(WrappedComponent, fetchDataFunc) {
    return function _(props) {
        const [startTime, setStartTime] = useState(props.startTime || 0);
        const [endTime, setEndTime] = useState(props.endTime || 0);
        const [data, setData] = useState({})
        const { onUpdateTime, series } = props

        useEffect(() => {
            fetchDataFunc({ startTime, endTime }).then(data => {
                setData(data)
            })
            onUpdateTime(startTime, endTime)
        }, [startTime, endTime, series]); // 仅在 count 更改时更新

        
        useEffect(() => {
            fetchDataFunc({ startTime, endTime }).then(data => {
                setData(data)
            })
            setStartTime(props.startTime)
            setEndTime(props.endTime)
        }, [props.startTime, props.endTime]); // 仅在 count 更改时更新

        return <WrappedComponent data={data} startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} />
    }
}


// 被动的widget: 下发的数据去做渲染
function withPassive(WrappedComponent) {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}


class Widget {
    // 渲染的部分
    // 获取的函数
    // 获取可选数据的列表
    // 事件
    // 元素级别可以配置的component
    // 元素内部的config
}

function WidgetDemo(props) {

    const { data, startTime, endTime, setStartTime, setEndTime, onDataZoom } = props

    return (
        <div>
            <h4>I am WidgetDemo</h4>
            <div>
                data: {JSON.stringify(data)}
            </div>
            <div>
                startTime: {startTime}
            </div>
            <div>
                endTime: {endTime}
            </div>
            <button onClick={() => { setStartTime && setStartTime(startTime + 1) }} hidden={!setStartTime}>startTime + 1</button>
            <button onClick={() => { setEndTime && setEndTime(endTime + 1) }} hidden={!setEndTime}>endTime + 1</button>
        </div>
    );
}


function fetchDataForWidgetDemo() {
    return new Promise(resolve => {
        resolve({
            "v": `Number:${Math.random()}`
        })
    })
}

export const ActiveWidgetDemo = withActive(WidgetDemo, fetchDataForWidgetDemo)
export const PassiveWidgetDemo = withPassive(WidgetDemo)


// {
//     ActiveWidgetDemo: ,
//     PassiveWidgetDemo: withPassive(WidgetDemo),
// }