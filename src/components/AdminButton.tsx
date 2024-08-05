"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import AdminPassKey from "@/components/model/AdminPassKey";

const AdminButton = () => {
	const [openPassKey, setOpenPassKey] = useState<boolean>(false);

	const openModal = () => {
		setOpenPassKey(true);
	};

	return (
		<>
			<AdminPassKey
				open={openPassKey}
				setOpen={setOpenPassKey}
			/>
			<Button variant="link" className="self-end" onClick={() => openModal()}>
				Admin
			</Button>
		</>
	);
};

export default AdminButton;
