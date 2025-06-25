import { useMemo, useCallback, useState } from "react";
import { useSessions } from "./useSession";
import { checkCollision } from "../utils/collision";

export const useSessionDeletionHandler = (sourceId: string) => {
  const { sessions, remove } = useSessions();
  const targetIds = useMemo(() => sessions.map((s) => s.id), [sessions]);
  const [lastCollidedId, setLastCollidedId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDrop = useCallback(() => {
    const collidedId = checkCollision(sourceId, targetIds);
    setLastCollidedId(collidedId);
    if (collidedId) {
      
      console.log(`[handleDrop] Collision detected with: ${collidedId}. Deleting...`);
      setPendingDeleteId(collidedId); 
    } else {
      console.log("[handleDrop] No collision detected.");
    }
  }, [sourceId, targetIds, remove]);
 const confirmDelete = () => {
    if (pendingDeleteId) {
      remove(pendingDeleteId);
      console.log(`[ConfirmDelete] Deleted: ${pendingDeleteId}`);
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = () => {
    console.log("[CancelDelete] User cancelled deletion");
    setPendingDeleteId(null);
  };
 return {
    sessions,
    handleDrop,
    pendingDeleteId,
    confirmDelete,
    cancelDelete,
  };
};
