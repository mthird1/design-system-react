/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Icon from "../../../icon";
import {EventUtil} from '../../../../utilities';
import escapeRegExp from 'lodash.escaperegexp';

const displayName = 'Lookup-Menu-Item';
const propTypes = {
  data: React.PropTypes.object,
  handleItemFocus: React.PropTypes.func,
  href: React.PropTypes.string,
  iconCategory: React.PropTypes.string,
  id: React.PropTypes.string,
  index: React.PropTypes.number,
  isActive: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  listItemLabelRenderer: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
  setFocus: React.PropTypes.func,
};
const defaultProps = {
};

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
      this.scrollFocus();
      this.props.setFocus(this.props.id);
    }
  }

  boldSearchText(children) {
    return children;
  }

  handleClick(e){
    return this.props.onSelect(this.props.id, this.props.data);
  }

  handleMouseDown(e){
    EventUtil.trapImmediate(e);
  }

  //Scroll menu item based on up/down mouse keys (assumes all items are the same height)
  scrollFocus(){
    const height = ReactDOM.findDOMNode(this).offsetHeight;
    if(height && this.props.handleItemFocus) this.props.handleItemFocus(this.props.index,height);
  }

  getLabel(){
    let icon;
    if(this.props.listItemLabelRenderer){
      const ListItemLabel = this.props.listItemLabelRenderer;
      return <ListItemLabel {... this.props} />;
    }
    if(this.props.iconName){
      icon = <Icon category={this.props.iconCategory} inverse={this.props.iconInverse} key={this.props.iconName} name={this.props.iconName} size="small" />;
    }
    return [
      icon,
      this.boldSearchText(this.props.children.label)
    ]
  }

  render(){
    let className = 'slds-lookup__item';
    let labelClassName = this.props.iconName ? '' : 'slds-m-left--x-small';
    let id = this.props.id;
    if(this.props.isActive) className += ' slds-theme--shade';

    return (
      //IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
      <li className={className}>
        <a
          aria-disabled={this.props.isDisabled}
          href={this.props.href}
          id={id}
          onClick={this.handleClick.bind(this)}
          onMouseDown={this.handleMouseDown.bind(this)}
          ref={id}
          role="option"
          tabIndex="-1">
            <span className={labelClassName}>
            { this.getLabel() }
            </span>
        </a>
      </li>
    )
  }
}

Item.displayName = displayName;
Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

module.exports = Item;