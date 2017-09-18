import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableDragSelect from '../../modules/react-table-drag-select-master/src';
//import 'react-table-drag-select/style.css';
import moment from 'moment';
import {
    increment,
    incrementAsync,
    decrement,
    decrementAsync
} from '../../modules/counter'

class Home extends React.Component {

    render(){
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing
})

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
