import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';
import { Button, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { PRIMARY_COLOR } from "../../../const";
import SwipeIcon from './components/SwipeIcon';
import images from './assets/images';

const MARGIN_TOP = Platform.OS === 'ios' ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get('window').height - MARGIN_TOP;
type Props = {
  hasRef?: () => void,
  swipeHeight?: number,
  itemMini?: object,
  itemFull: object,
  disablePressToShow?: boolean,
  style?: object,
  onShowMini?: () => void,
  onShowFull?: () => void,
  animation?: 'linear' | 'spring' | 'easeInEaseOut' | 'none'
};
export default class SwipeUpDown extends Component<Props> {
  static defautProps = {
    disablePressToShow: false
  };
  constructor(props) {
    super(props);
    this.state = {
      // collapsed: true,
      collapsed: true,
      bgColor: PRIMARY_COLOR
    };
    this.disablePressToShow = props.disablePressToShow;
    this.SWIPE_HEIGHT = props.swipeHeight || 60;
    this._panResponder = null;
    this.top = this.SWIPE_HEIGHT;
    this.height = this.SWIPE_HEIGHT;
    this.customStyle = {
      style: {
        bottom: 0,
        top: this.top,
        height: this.height
      }
    };
    this.checkCollapsed = true;
    this.showFull = this.showFull.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    });
  }

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }

  updateNativeProps() {
    switch (this.props.animation) {
      case 'linear':
        LayoutAnimation.linear();
        break;
      case 'spring':
        LayoutAnimation.spring();
        break;
      case 'easeInEaseOut':
        LayoutAnimation.easeInEaseOut();
        break;
      case 'none':
      default:
        break;
    }
    this.viewRef.setNativeProps(this.customStyle);
  }

  _onPanResponderMove(event, gestureState) {
    if (gestureState.dy > 0 && !this.checkCollapsed) {
      // SWIPE DOWN
      this.customStyle.style.top = this.top + gestureState.dy;
      this.customStyle.style.height = DEVICE_HEIGHT - gestureState.dy;
      this.swipeIconRef && this.swipeIconRef.setState({ icon: images.minus });
      // !this.state.collapsed && this.setState({ collapsed: true }); //Con esto activo se quita el Thumbnail inmediatamente se desliza hacia abajo
      this.updateNativeProps();
    } else if (this.checkCollapsed && gestureState.dy < -60) {
      // SWIPE UP
      this.setState({ bgColor: "#00174d" })

      this.top = 0;
      this.customStyle.style.top = DEVICE_HEIGHT + gestureState.dy;
      this.customStyle.style.height = -gestureState.dy + this.SWIPE_HEIGHT;
      this.swipeIconRef && //Aprender a usar el REF full del componente, aca el llama al setState normalito
        this.swipeIconRef.setState({ icon: images.minus, showIcon: true });
      if (this.customStyle.style.top <= DEVICE_HEIGHT / 2) {
        this.swipeIconRef &&
          this.swipeIconRef.setState({
            icon: images.arrow_down,
            showIcon: true
          });
      }
      this.updateNativeProps();
      this.state.collapsed && this.setState({ collapsed: false });
    }
  }

  _onPanResponderRelease(event, gestureState) {
    if (gestureState.dy < -100 || gestureState.dy < 100) {
      this.showFull();
    } else {
      this.showMini();
    }
    // if (gestureState.dy < -100 || gestureState.dy < 100) {
    //   this.showFull();
    // } else {
    //   this.showMini();
    // }
  }

  showFull() {
    const { onShowFull } = this.props;
    // this.customStyle.style.top = 30;
    //Tamaño del margin top
    this.customStyle.style.top = "1%";
    this.customStyle.style.height = DEVICE_HEIGHT;
    this.swipeIconRef &&
      this.swipeIconRef.setState({ icon: images.arrow_down, showIcon: true });
    // this.setState({ bgColor: "rgba(	0, 30, 102, 0.5)" })
    // this.setState({ bgColor: "#00081a" })
    this.updateNativeProps();
    this.state.collapsed && this.setState({ collapsed: false });
    this.checkCollapsed = false;
    onShowFull && onShowFull();
  }

  showMini() {
    const { onShowMini, itemMini } = this.props;
    this.customStyle.style.top = itemMini
      ? DEVICE_HEIGHT - this.SWIPE_HEIGHT
      : DEVICE_HEIGHT;
    this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0;
    // this.swipeIconRef && this.swipeIconRef.setState({ showIcon: false });
    this.swipeIconRef && this.swipeIconRef.setState({ showIcon: true });
    this.setState({ bgColor: PRIMARY_COLOR })
    this.updateNativeProps();
    !this.state.collapsed && this.setState({ collapsed: true });
    this.checkCollapsed = true;
    onShowMini && onShowMini();
  }

  render() {
    const { itemMini, itemFull, style } = this.props;
    const { collapsed, bgColor } = this.state;
    return (
      // <LinearGradient colors={["#153A8B","#001E66"]} style={{flex: 1}} ></LinearGradient>
      <View
        ref={ref => (this.viewRef = ref)}
        style={[
          styles.wrapSwipe,
          {
            height: this.SWIPE_HEIGHT,
            marginTop: MARGIN_TOP
          },
          !itemMini && collapsed && { marginBottom: -200 },
          { backgroundColor: bgColor },
          
        ]}
      >

        <View
          {...this._panResponder.panHandlers}
          style={{ height: 30, backgroundColor: "", justifyContent: "center", alignItems: "center" }}

        >
          <TouchableOpacity onPress={() => this.showMini}>
            <Icon name={collapsed ? "minus" : "chevron-down"} type="MaterialCommunityIcons" style={{ color: "white" }} />
          </TouchableOpacity>
        </View>

        {/* <SwipeIcon
          onClose={() => this.showMini()}
          hasRef={ref => (this.swipeIconRef = ref)}
        /> */}
        {collapsed ? (
          itemMini ? (
            <View>
              {itemMini}
            </View>

          ) : null
        ) : (
            itemFull
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapSwipe: {
    padding: 10,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
