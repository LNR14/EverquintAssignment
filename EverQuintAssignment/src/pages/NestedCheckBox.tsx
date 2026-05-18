import { useState } from "react";
import { Checkbox, FormControlLabel, Box } from "@mui/material";

const initialData = {
  id: "parent1",
  label: "Parent 1",
  children: [
    {
      id: "parent2",
      label: "Parent 2",
      children: [
        { id: "child1", label: "Child 1" },
        { id: "child2", label: "Child 2" },
        {
          id: "child3",
          label: "Child 3",
          children: [
            { id: "child4", label: "Child 4" },
            { id: "child5", label: "Child 5" },
          ],
        },
      ],
    },
    { id: "parent3", label: "Parent 3" },
    { id: "parent4", label: "Parent 4" },
    { id: "parent5", label: "Parent 5" },
  ],
};

const NestedCheckBox = () => {
  // Store selected IDs in a Set for O(1) lookup
  const [selected, setSelected] = useState(new Set());

  // Helper: Get all descendant IDs of a node
  const getAllChildIds = (node, idList = []) => {
    if (node.children) {
      node.children.forEach((child) => {
        idList.push(child.id);
        getAllChildIds(child, idList);
      });
    }
    return idList;
  };

  // Helper: Check status of a node's children
  const getChildStatus = (node) => {
    if (!node.children)
      return { allChecked: selected.has(node.id), someChecked: false };

    const childIds = getAllChildIds(node);
    const selectedChildren = childIds.filter((id) => selected.has(id));

    return {
      allChecked:
        selectedChildren.length === childIds.length && selected.has(node.id),
      someChecked:
        selectedChildren.length > 0 &&
        selectedChildren.length < childIds.length,
    };
  };

  const handleToggle = (node) => {
    const newSelected = new Set(selected);
    const isChecking = !selected.has(node.id);
    const idsToUpdate = [node.id, ...getAllChildIds(node)];

    idsToUpdate.forEach((id) => {
      isChecking ? newSelected.add(id) : newSelected.delete(id);
    });

    setSelected(newSelected);
  };

  const renderTree = (node) => {
    const { allChecked, someChecked } = getChildStatus(node);

    return (
      <Box
        key={node.id}
        sx={{ display: "flex", flexDirection: "column", ml: 3 }}
      >
        <FormControlLabel
          label={node.label}
          control={
            <Checkbox
              checked={selected.has(node.id)}
              indeterminate={someChecked && !allChecked}
              onChange={() => handleToggle(node)}
            />
          }
        />
        {node.children && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {node.children.map((child) => renderTree(child))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <h3>Nested Permissions</h3>
      {renderTree(initialData)}
      <hr />
      <pre>Selected IDs: {JSON.stringify([...selected], null, 2)}</pre>
    </Box>
  );
};

export default NestedCheckBox;
