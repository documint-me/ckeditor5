/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import {
	Font,
	FontBackgroundColor,
	FontColor,
	FontFamily
} from '@ckeditor/ckeditor5-font/src';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import {
	Table,
	TableToolbar,
	TableUI,
	TableEditing,
	TableProperties,
	TablePropertiesEditing,
	TableCellProperties,
	TableCellPropertiesEditing
} from '@ckeditor/ckeditor5-table/src';
import {
	HtmlEmbed,
	HtmlEmbedEditing,
	HtmlEmbedUI
} from '@ckeditor/ckeditor5-html-embed/src';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

export default class DocumintEditor extends ClassicEditorBase {}

// Plugins to include in the build.
DocumintEditor.builtinPlugins = [
	Essentials,
	Alignment,
	Bold,
	Italic,
	Font,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	HtmlEmbed,
	HtmlEmbedEditing,
	HtmlEmbedUI,
	Indent,
	Link,
	Paragraph,
	Table,
	TableToolbar,
	TableUI,
	TableEditing,
	TableProperties,
	TablePropertiesEditing,
	TableCellProperties,
	TableCellPropertiesEditing,
	TextTransformation
];

// Editor configuration.
DocumintEditor.defaultConfig = {
	toolbar: {
		items: [
			'bold',
			'italic',
			'|',
			'link',
			'alignment',
			'fontsize',
			'|',
			'outdent',
			'indent',
			'|',
			'insertTable',
			'undo',
			'redo'
		]
	},
	table: {
		contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
