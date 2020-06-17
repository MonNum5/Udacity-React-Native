import React, { Component } from 'react'
import { View, Text,TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback  } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdacitySlider from './UdacitySilder'
import UdacityStepper from './UdacityStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

function SubmitBtn({ onPress }){
    return(
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )

}

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0

    }

    increment = (metric) => {
        const { max, step} = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

        return {
            ...state,
            [metric]: count > max ? max : count
        }
        }
        )
        
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] - step

        return {
            ...state,
            [metric]: count < 0 ? 0 : count
        }
        }
        )
        
    }
    
    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))

    }

    submit = () => {
        const key = timeToString
        const entry = this.state

        // We want to update reddux

        this.setState(()=>({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }))

        // navigate home

        // save to db

        // clean notifications

    }
    reset = () => {
        const key = timeToString()

        // update redux

        // route home

        // update database
    }
    render(){
        const metaInfo = getMetricMetaInfo()

        if (true){
            return(
                <View>
                    <Ionicons 
                    name='ios-happy'
                    size={100}
                    />
                    <Text>You already logged our information for today</Text>
                    <TextButton onPress={ this.reset }> Reset</TextButton>
                </View>
            )

        }

        return(
            
            <View>
                <Text>{JSON.stringify(this.state)}</Text>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]

                    return(
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider' ? <UdacitySlider value = {value} onChange ={(value) => this.slide(key, value)} 
                            { ...rest}
                            />
                            : <UdacityStepper value = {value}onIncrement ={() => this.increment(key)}
                            onDecrement ={() => this.decrement(key)} {...rest}
                            />
                    }
                        </View>

                    )

                })}
                <SubmitBtn onPress= {this.submit} />
            </View>
        )
    }

}