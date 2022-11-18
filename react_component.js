'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }
}

// Find the <div> in the HTML code where to create the React app

const domContainer = document.querySelector('#react_component');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));