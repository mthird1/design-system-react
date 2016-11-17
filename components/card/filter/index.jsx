/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
// React is an external dependency of the project.
import React from 'react';

import Input from '../../forms/input';
import InputIcon from '../../icon/input-icon';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

import { CARD_FILTER } from '../../../utilities/constants';

/**
 * A default filter or search input for Cards that contain items.
 */
const Filter = (props) => {
	const {
		id,
		placeholder,
		onChange,
		...rest
	} = props;

	return (
		<Input
			{...rest}
			assistiveText={placeholder}
			iconLeft={<InputIcon name="search" category="utility" />}
			id={id}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Filter.displayName = CARD_FILTER;

	// ### Prop Types
Filter.propTypes = {
	/**
	 * The HTML `id` from the card with a suffixe.
	 */
	id: PropTypes.string,
	/**
	 * This callback fires when the input changes.
	 */
	onChange: PropTypes.func,
	/**
	 * Text present in input until the user enters text. This text will also be used for a visually hidden label on the filter `input` element for accessibility.
	 */
	placeholder: PropTypes.string.isRequired
};

Filter.defaultProps = {
	placeholder: 'Find in List'
};

module.exports = Filter;