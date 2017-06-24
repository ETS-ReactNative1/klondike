import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HiddenCard from './HiddenCard';

class Card extends Component {
    path(figure, color) {
        return `/cards/${figure}_of_${color}.svg`;
    }

    render() {
        if (this.props.turnedUp) {
            return <div className="card">
                <img src={this.path(this.props.figure, this.props.color)} alt=""/>
            </div>;
        } else {
            return <HiddenCard/>
        }
    }
}

Card.propTypes = {
    figure: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    turnedUp: PropTypes.bool.isRequired,
};

export default Card;
