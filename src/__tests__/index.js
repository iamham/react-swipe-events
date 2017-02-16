import React from 'react'

import { mount } from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'

import ReactSwipeEvents from '../index'

describe('ReactSwipeEvents rendering with input children', () => {
    it('it render input div children correctly', () => {
        const wrapper = mount(
            <ReactSwipeEvents>
                <div id='inputDiv'>
                    Hello Div !
                </div>
            </ReactSwipeEvents>
        )
        expect(wrapper.find('#inputDiv')).to.have.length(1)
    })

    it('it render input span children correctly', () => {
        const wrapper = mount(
            <ReactSwipeEvents>
                <span id='inputSpan'>
                    Hello Span !
                </span>
            </ReactSwipeEvents>
        )
        expect(wrapper.find('#inputSpan')).to.have.length(1)
    })
})

describe('ReactSwipeEvents rendering with input children', () => {
    it('it render input span children correctly', () => {
        const wrapper = mount(
            <ReactSwipeEvents>
                <span id='inputSpan'>
                    Hello Span !
                </span>
            </ReactSwipeEvents>
        )
        expect(wrapper.find('#inputSpan')).to.have.length(1)
    })
})
