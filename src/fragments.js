export const USER_FRAGMENT = `
    id
    username
    avatar
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user {
      ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
  fragment PostParts on POST {
    id
    location
    caption
    files {
      ${FILE_FRAGMENT}
    }
    comments {
      ${COMMENT_FRAGMENT}
    }
    
    user {
      ${USER_FRAGMENT}
    }
  }
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to {
      ${USER_FRAGMENT}
    }
    from {
      ${USER_FRAGMENT}
    }
`;

export const CHAT_FRAGMENT = `
  fragment ChatParts on Chat {
    id
    participants {
      ${USER_FRAGMENT}
    }
    messages {
      ${MESSAGE_FRAGMENT}
    }
  }
`;
