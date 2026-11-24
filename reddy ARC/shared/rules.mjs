/** An invalid or duplicate timestamp makes a stage history ambiguous. */
export function passedRequired(product) {
  return ['SERIAL_PRINTING', 'LEAKAGE', 'FIRE_RESISTANCE', 'QUALITY'].every(
    (stage) => {
      const history = (product.inspections || []).filter(
        (i) => i.stage === stage,
      );
      const times = history.map((i) => Date.parse(i.inspectedAt));
      if (
        !history.length ||
        times.some((t) => !Number.isFinite(t)) ||
        new Set(times).size !== times.length
      )
        return false;
      return history[times.indexOf(Math.max(...times))].result === 'PASS';
    },
  );
}
export function validatePair(parent, child, relationships = []) {
  const block = (reason) => ({
    assembly_allowed: false,
    reason,
    parent_status: parent?.overallStatus ?? 'NOT_FOUND',
    child_status: child?.overallStatus ?? 'NOT_FOUND',
  });
  if (!parent) return block('Parent serial number was not found.');
  if (!child) return block('Child serial number was not found.');
  if (
    parent.id === child.id ||
    parent.componentType !== 'PARENT' ||
    child.componentType !== 'CHILD'
  )
    return block('Select a parent and a child component.');
  if (
    ['FAILED', 'REJECTED', 'REPAIR_PENDING', 'REPAIR_COMPLETED'].includes(
      parent.overallStatus,
    )
  )
    return block(
      'Parent product has failed inspection. Child component cannot be assigned to this parent.',
    );
  if (
    ['RESERVED', 'FITTED', 'OUTPUT'].includes(child.overallStatus) ||
    relationships.some(
      (r) =>
        r.childProductId === child.id && r.relationshipStatus !== 'CANCELLED',
    )
  )
    return block('Child component is already assigned.');
  if (
    relationships.some(
      (r) =>
        r.parentProductId === parent.id && r.relationshipStatus !== 'CANCELLED',
    )
  )
    return block('Parent already has an active child assignment.');
  if (!passedRequired(parent) || !passedRequired(child))
    return block('Both components must pass all required inspections.');
  if (
    parent.currentStage !== 'ASSEMBLY' ||
    child.currentStage !== 'ASSEMBLY' ||
    parent.overallStatus !== 'PASSED' ||
    child.overallStatus !== 'PASSED'
  )
    return block('Both components must be eligible for assembly.');
  if (!parent.productType || parent.productType !== child.productType)
    return block('Product types are not compatible.');
  if (
    !parent.productionOrderId ||
    parent.productionOrderId !== child.productionOrderId
  )
    return block('Production orders are not compatible.');
  if (parent.lineCode !== 'P7' || child.lineCode !== 'P7')
    return block('Assembly components must be routed to P7.');
  return {
    assembly_allowed: true,
    reason: 'MATCH VERIFIED — ASSEMBLY AUTHORIZED',
    parent_status: parent.overallStatus,
    child_status: child.overallStatus,
  };
}
