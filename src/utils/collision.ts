export function checkCollision(sourceId: string, targetIds: string[]): string | null {

    const sourceElement = document.getElementById(sourceId);

    if (!sourceElement) {
      console.error(`[checkCollision] Source element with id "${sourceId}" not found.`);
      return null;
    }

    const sourceRect = sourceElement.getBoundingClientRect();


    for (const targetId of targetIds) {
      const targetElement = document.getElementById(targetId);
      console.log(`[checkCollision] Checking collision between source "${sourceId}" and target "${targetId}".`);

      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        // Thuật toán va chạm AABB 
        const isOverlapping =
          sourceRect.left < targetRect.right &&
          sourceRect.right > targetRect.left &&
          sourceRect.top < targetRect.bottom &&
          sourceRect.bottom > targetRect.top;

        if (isOverlapping) {
          return targetId;
        }
      }
    }

  return null;
}