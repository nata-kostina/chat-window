export interface ISettingsModal {
  targetRect: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null;
  hideModal: () => void;
  handleDelete: () => void;
  handleCopy: () => void;
  addReaction: (reaction: string) => void;
}
