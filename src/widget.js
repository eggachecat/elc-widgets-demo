import React, { useState, useEffect } from 'react';

// 主动的组件: 数据获取自动完成
function withActive(WrappedComponent) {
    return function _(props) {
        const [startTime, setStartTime] = useState(props.startTime || 0);
        const [endTime, setEndTime] = useState(props.endTime || 0);
        const [data, setData] = useState({})
        const { onUpdateTime } = props

        useEffect(() => {
            setTimeout(() => {
                setData({ value: `Number:${Math.random()}` })
            })
            onUpdateTime(startTime, endTime)
        }, [startTime, endTime]); // 仅在 count 更改时更新

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


function WidgetDemo(props) {

    const { data, startTime, endTime, setStartTime, setEndTime } = props

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

export const ActiveWidgetDemo = withActive(WidgetDemo)
export const PassiveWidgetDemo = withPassive(WidgetDemo)


// {
//     ActiveWidgetDemo: ,
//     PassiveWidgetDemo: withPassive(WidgetDemo),
// }