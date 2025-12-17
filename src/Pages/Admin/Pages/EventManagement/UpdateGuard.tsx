import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useState, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import Label from "../../components/form/Label.tsx";
import Input from "../../components/form/input/InputField.tsx";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Axios/axiosInstance.ts";

export default function UpdateGuard() {
    const navigate = useNavigate();
    const { id } = useParams(); // /guard/:id

    const [loading, setLoading] = useState(false);
    const [floors, setFloors] = useState([]);
    const [floorIds, setFloorIds] = useState<string>();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        assignedFloors: "",
        email: "",
        employeeId: "",
        shift: "",
        status: "",
        failedAttempts: 0,
        password: "",
    });

    // Fetch floors
    useEffect(() => {
        async function fetchFloors() {
            try {
                const res = await api.post("/floor/list", {
                    filter: {
                        $or: [
                            { assignedGuards: { $exists: false } },
                            { assignedGuards: { $size: 0 } },
                            { assignedGuards: { $eq: id } }
                        ]
                    }
                });
                setFloors(res.data.data || []);
            } catch (error) {
                toast.error("Failed to load floors");
            }
        }
        fetchFloors();
    }, []);

    // Fetch guard details by ID
    useEffect(() => {
        async function fetchGuard() {
            try {
                const res = await api.get(`/guard/${id}`);
                if (res.data.success) {
                    const g = res.data.data;

                    setFormData({
                        name: g.name || "",
                        phone: g.phone || "",
                        address: g.address || "",
                        assignedFloors: g.assignedFloors[0]._id || "",
                        email: g.email || "",
                        employeeId: g.employeeId || "",
                        shift: g.shift || "",
                        status: g.status || "active",
                        failedAttempts: g.failedAttempts || 0,
                        password: "", // Do NOT prefill password
                    });
                    setFloorIds(g.assignedFloors[0]._id || "");
                }
            } catch (error) {
                toast.error("Failed to load guard");
            }
        }

        if (id) fetchGuard();
    }, [id]);

    // Handle input changes
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFloorChange = (e: any) => {
        const { value } = e.target;
        setFloorIds(value);
        setFormData({ ...formData, assignedFloors: value });
    }

    // Submit update
    const handleSubmit = async () => {
        if (!formData.name || !formData.phone) {
            toast.error("Name and Phone are required");
            return;
        }

        setLoading(true);

        try {
            const payload: any = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                shift: formData.shift,
                status: formData.status,
                assignedFloors: floorIds ? [floorIds] : [],
            };

            if (formData.password.trim() !== "") {
                payload.password = formData.password;
            }

            const res = await api.put(`/guard/${id}`, payload);

            if (res.data.success) {
                toast.success("Guard updated successfully");
                navigate("/guard-list");
            } else {
                toast.error(res.data.message || "Failed to update guard");
            }
        } catch (error) {
            toast.error("Error updating guard");
        }

        setLoading(false);
    };

    return (
        <div>
            <PageMeta title="Update Guard" description="Modify guard details" />
            <PageBreadcrumb pageTitle="Update Guard" />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">

                    <ComponentCard title="Guard Details">
                        <div className="space-y-6">

                            <div>
                                <Label htmlFor="employeeId">Employee ID</Label>
                                <Input type="text" id="employeeId" disabled value={formData.employeeId} />
                            </div>

                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input type="text" id="name" value={formData.name} onChange={handleChange} />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input type="text" id="phone" value={formData.phone} onChange={handleChange} />
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input type="text" id="address" value={formData.address} onChange={handleChange} />
                            </div>

                            <div>
                                <Label htmlFor="floor_id">Assign Floor</Label>
                                <select
                                    id="floor_id"
                                    value={formData.assignedFloors}
                                    onChange={handleFloorChange}
                                    className="w-full rounded border border-stroke bg-white dark:bg-gray-700 py-3 px-4 text-black"
                                >
                                    <option value="">Select Floor</option>
                                    {floors?.map((floor: any) => (
                                        <option key={floor._id} value={floor._id}>
                                            {floor?.floorLabel}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="shift">Select Shift</Label>
                                <select
                                    id="shift"
                                    value={formData.shift}
                                    onChange={handleChange}
                                    className="w-full rounded border border-stroke py-3 px-4"
                                >
                                    <option value="">Select Shift</option>
                                    <option value="Morning">Morning</option>
                                    <option value="Evening">Evening</option>
                                    <option value="Night">Night</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full rounded border border-stroke py-3 px-4"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                        </div>
                    </ComponentCard>

                    <ComponentCard title="Login Credentials">
                        <div className="space-y-6">

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="text" value={formData.email} disabled />
                            </div>

                            <div>
                                <Label htmlFor="password">Password (optional)</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Enter new password if changing"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <Label htmlFor="failedAttempts">Failed Attempts</Label>
                                <Input
                                    type="number"
                                    id="failedAttempts"
                                    value={formData.failedAttempts}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                    </ComponentCard>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-4 w-full rounded bg-green-600 py-3 text-white hover:bg-green-700"
                    >
                        {loading ? "Updating..." : "Update Guard"}
                    </button>

                </div>
            </div>
        </div>
    );
}
