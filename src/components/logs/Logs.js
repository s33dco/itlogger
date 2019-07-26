import React, { useEffect } from 'react';
import { connect } from 'react-redux'; // import to compoent if need to interact with redux
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
	// mapStatetoProps log destructured to get logs and loading

	useEffect(() => {
		getLogs();
		//eslint-disable-next-line
	}, []);

	if (loading || logs === null) {
		return <Preloader />;
	}

	return (
		<div>
			<ul className="collection with-header">
				<li className="collection-header">
					<h4 className="center">System Logs</h4>
				</li>
				{!loading && logs.length === 0 ? (
					<p className="center">no logs to show...</p>
				) : (
					logs.map(log => <LogItem log={log} key={log.id} />)
				)}
			</ul>
		</div>
	);
};

Logs.propTypes = {
	log: PropTypes.object.isRequired
};

// below bringing in whole state and then destructuring when passing in as props
// it could look like :
// const mapStateToProps = state => ({
// 	logs: state.log.log,
// 	loading: state.log.loading
// });

const mapStateToProps = state => ({
	log: state.log // the name of the reducer in combineReducers (reducers/index.js)
});

export default connect(
	mapStateToProps,
	{ getLogs } // getLogs becomes props, actions added as second parameter
)(Logs);
