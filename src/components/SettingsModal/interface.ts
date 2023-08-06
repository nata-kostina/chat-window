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
  toggleReaction: (reaction: string) => void;
}
