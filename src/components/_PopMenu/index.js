import React from 'react';
import { View, TouchableOpacity, UIManager, findNodeHandle } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from "native-base"

const ICON_SIZE = 24;

class PopupMenu extends React.Component {
    handleShowPopupError = () => {
        // show error here
    };

    handleMenuPress = () => {
        const { actions, onPress } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.refs.menu),
            actions,
            this.handleShowPopupError,
            onPress,
        );
    };

    render() {
        return (
            <View>
                {this.props.children}
                <TouchableOpacity onPress={this.handleMenuPress} style={{ alignSelf: 'center', backgroundColor: 'transparent', paddingLeft: 15, paddingRight: 15 }}>
                    <Icon
                        style={{ color: "white" }}
                        name="md-more"
                        size={ICON_SIZE}
                        color="red"
                        ref="menu"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

// PopupMenu.propTypes = {
//   actions: React.PropTypes.array.isRequired,
//   onPress: React.PropTypes.func.isRequired,
//   children: React.PropTypes.object.isRequired,
// };

export default PopupMenu;