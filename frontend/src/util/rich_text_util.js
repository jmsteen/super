import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import React from 'react';


const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} nofollow="true" noreferrer="true">
      {props.children}
    </a>
  );
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
};

const decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link
}]);

export const rawToPlain = (rawText) => {
  const richContent = convertFromRaw(JSON.parse(rawText));
  const editorState = EditorState.createWithContent(richContent, decorator);
  return editorState.getCurrentContent().getPlainText();
};