'use strict';

import React, { PropTypes } from 'react';

import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Animated
} from 'react-native';

var Accordion = React.createClass({

  propTypes: {
    activeOpacity: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    content: React.PropTypes.element.isRequired,
    easing: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    header: React.PropTypes.element.isRequired,
    onPress: React.PropTypes.func,
    underlayColor: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      activeOpacity: 1,
      animationDuration: 300,
      easing: 'linear',
      expanded: false,
      underlayColor: '#000',
      style: {}
    };
  },

  getInitialState() {
    return {
      is_visible: false,
      height: new Animated.Value(0),
      content_height: 0
    };
  },

  close() {
    this.state.is_visible && this.toggle();
  },

  open() {
    !this.state.is_visible && this.toggle();
  },

  toggle() {
    this.state.is_visible = !this.state.is_visible;

    Animated.parallel([
      Animated.timing(this.state.height, {
        duration: 200,
        toValue: this.state.is_visible ? this.state.content_height : 0,
      })
    ]).start();
  },

  _onPress() {
    this.toggle();

    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  },

  _getContentHeight() {
    if (this.refs.AccordionContent) {
      //this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
        // Sets content height in state
        this.setState({
          height: this.props.expanded ? new Animated.Value(60) : new Animated.Value(0),
          content_height: 60
        });
      //});
    }
  },

  componentDidMount() {
    // Gets content height when component mounts
    // without setTimeout, measure returns 0 for every value.
    // See https://github.com/facebook/react-native/issues/953
    setTimeout(this._getContentHeight);
  },

  render() {
    return (
      /*jshint ignore:start */
      <View
        style={{
          overflow: 'hidden'
        }}
      >
        <TouchableHighlight
          ref="AccordionHeader"
          onPress={this._onPress}
          underlayColor={this.props.underlayColor}
          style={this.props.style}
        >
          {this.props.header}
        </TouchableHighlight>
        <Animated.View
          ref="AccordionContentWrapper"
          style={{
            height: this.state.height
          }}
        >
          <View ref="AccordionContent" style={{flex:1}}>
            {this.props.content}
          </View>
        </Animated.View>
      </View>
      /*jshint ignore:end */
    );
  }
});

module.exports = Accordion;
