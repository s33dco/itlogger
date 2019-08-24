import React, { useState, useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions'
import { connect } from 'react-redux';
import { updateLog, clearCurrent } from '../../actions/logActions';
import PropTypes from 'prop-types';

import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ({ current, updateLog, clearCurrent }) => {
	const [message, setMessage] = useState('');
	const [attention, setAttention] = useState(false);
	const [tech, setTech] = useState('');

	useEffect(() => {
		if (current) {
			setMessage(current.message);
			setAttention(current.attention);
			setTech(current.tech);
		}
	}, [current]); // current is dependancy for useEffect

	const onSubmit = () => {
		if (message === '' || tech === '') {
			M.toast({ html: ' Please enter a message and tech' });
		} else {
			const updatedLog = {
				id: current.id,
				message,
				tech,
				attention,
				date: new Date()
			};

			M.toast({ html: `log updated by ${tech}` });

			updateLog(updatedLog);
			// clear fields
			setMessage('');
			setTech('');
			setAttention('');
			clearCurrent();
		}
	};

	return (
		<div id="edit-log-modal" className="modal" style={modalStyle}>
			<div className="modal-content">
				<h4>Enter System Log</h4>
				<div className="row">
					<div className="input-field">
						<input
							type="text"
							name="message"
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<select
							name="tech"
							value={tech}
							className="browser-default"
							onChange={e => setTech(e.target.value)}
						>
							<option value="" disabled>
								Select technician
							</option>
							<TechSelectOptions />
						</select>
					</div>
				</div>
				<div className="row">
					<div className="input-field">
						<p>
							<label>
								<input
									type="checkbox"
									className="filled-in"
									checked={attention}
									value={attention}
									onChange={e => setAttention(!attention)}
								/>
								<span>Needs attention</span>
							</label>
						</p>
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<a
					href="#!"
					onClick={onSubmit}
					className="modal-close waves-effect blue waves-light btn"
				>
					Enter
				</a>
			</div>
		</div>
	);
};

const modalStyle = {
	width: '75%',
	height: '75%'
};

EditLogModal.propTypes = {
	current: PropTypes.object,
	updateLog: PropTypes.func.isRequired,
	clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	current: state.log.current // the name of the reducer in combineReducers (reducers/index.js)
});

export default connect(
	mapStateToProps,
	{ updateLog, clearCurrent }
)(EditLogModal); // null as no props from state 2nd paramter for action
